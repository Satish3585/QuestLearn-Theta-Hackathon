import random
from datetime import date, datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import auth
import storage
from content import CONTENT

app = FastAPI(title="NCERT Gamified Learning App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str  # "student" or "teacher"
    display_name: str


class LoginRequest(BaseModel):
    username: str
    password: str


class ActivityResultRequest(BaseModel):
    activity_id: str
    time_taken_seconds: int
    # Exactly one of these should be populated, matching the activity's type.
    quiz_answers: Optional[List[int]] = None          # selected option index per question
    match_answers: Optional[dict] = None               # {left_text: right_text} as chosen by student
    sequence_answer: Optional[List[str]] = None         # student's chosen order of steps


def _grade_activity(activity: dict, req: "ActivityResultRequest"):
    """Server-side grading so results can't be spoofed by the client."""
    if activity["type"] == "quiz":
        answers = req.quiz_answers or []
        total = len(activity["questions"])
        correct = sum(
            1 for i, q in enumerate(activity["questions"])
            if i < len(answers) and answers[i] == q["answer"]
        )
        return correct, total

    if activity["type"] == "match":
        chosen = req.match_answers or {}
        total = len(activity["pairs"])
        correct = sum(
            1 for pair in activity["pairs"]
            if chosen.get(pair["left"]) == pair["right"]
        )
        return correct, total

    if activity["type"] == "sequence":
        chosen = req.sequence_answer or []
        correct_order = activity["correct_order"]
        total = len(correct_order)
        correct = sum(1 for i, step in enumerate(correct_order) if i < len(chosen) and chosen[i] == step)
        return correct, total

    raise HTTPException(status_code=400, detail="Unknown activity type")


# ---------------------------------------------------------------------------
# Auth dependency
# ---------------------------------------------------------------------------

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = authorization.split(" ", 1)[1]
    session = auth.get_session(token)
    if not session:
        raise HTTPException(status_code=401, detail="Session expired or invalid, please log in again")
    return session


def require_role(role: str):
    def checker(user=Depends(get_current_user)):
        if user["role"] != role:
            raise HTTPException(status_code=403, detail=f"This action requires role: {role}")
        return user
    return checker


# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------

@app.post("/auth/register")
def register(req: RegisterRequest):
    if req.role not in ("student", "teacher"):
        raise HTTPException(status_code=400, detail="Role must be 'student' or 'teacher'")

    users = storage.get_users()
    if req.username in users:
        raise HTTPException(status_code=400, detail="Username already exists")

    users[req.username] = {
        "password_hash": auth.hash_password(req.password),
        "role": req.role,
        "display_name": req.display_name,
        "created_at": datetime.utcnow().isoformat(),
    }
    storage.save_users(users)
    storage.get_user_progress(req.username)  # initialize progress record

    token = auth.create_session(req.username, req.role)
    return {"token": token, "username": req.username, "role": req.role, "display_name": req.display_name}


@app.post("/auth/login")
def login(req: LoginRequest):
    users = storage.get_users()
    user = users.get(req.username)
    if not user or not auth.verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = auth.create_session(req.username, user["role"])
    return {
        "token": token,
        "username": req.username,
        "role": user["role"],
        "display_name": user["display_name"],
    }


@app.post("/auth/logout")
def logout(authorization: Optional[str] = Header(None)):
    if authorization and authorization.startswith("Bearer "):
        auth.revoke_session(authorization.split(" ", 1)[1])
    return {"status": "logged out"}


# ---------------------------------------------------------------------------
# Content endpoints
# ---------------------------------------------------------------------------

def _activity_summary(activity):
    """Strip answer keys before sending activity lists (but keep for the play endpoint)."""
    summary = {"id": activity["id"], "type": activity["type"], "title": activity["title"], "xp": activity["xp"]}
    return summary


@app.get("/content/subjects")
def get_subjects(user=Depends(get_current_user)):
    result = []
    for subject_key, subject in CONTENT.items():
        topics = []
        for topic in subject["topics"]:
            topics.append({
                "id": topic["id"],
                "name": topic["name"],
                "activity_count": len(topic["activities"]),
                "activities": [_activity_summary(a) for a in topic["activities"]],
            })
        result.append({"subject_key": subject_key, "subject_name": subject["subject_name"], "topics": topics})
    return result


def _find_activity(activity_id: str):
    for subject in CONTENT.values():
        for topic in subject["topics"]:
            for activity in topic["activities"]:
                if activity["id"] == activity_id:
                    return activity, topic
    return None, None


@app.get("/content/activity/{activity_id}")
def get_activity(activity_id: str, user=Depends(get_current_user)):
    activity, topic = _find_activity(activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    completed = activity_id in storage.get_user_progress(user["username"])["completed_activities"]

    payload = {
        "id": activity["id"],
        "type": activity["type"],
        "title": activity["title"],
        "xp": activity["xp"],
        "already_completed": completed,
        "topic_name": topic["name"],
    }

    if activity["type"] == "quiz":
        # Never send the answer index to the client.
        payload["questions"] = [{"q": q["q"], "options": q["options"]} for q in activity["questions"]]

    elif activity["type"] == "match":
        # Send left items in order, right items shuffled so the pairing isn't revealed.
        lefts = [p["left"] for p in activity["pairs"]]
        rights = [p["right"] for p in activity["pairs"]]
        random.shuffle(rights)
        payload["left_items"] = lefts
        payload["right_items"] = rights

    elif activity["type"] == "sequence":
        # Send the steps shuffled; student must reconstruct the correct order.
        steps = list(activity["correct_order"])
        random.shuffle(steps)
        payload["shuffled_steps"] = steps
        payload["title_hint"] = activity["title"]

    return payload


# ---------------------------------------------------------------------------
# Gamification engine
# ---------------------------------------------------------------------------

LEVEL_XP_STEP = 100  # every 100 XP = 1 level


def _calc_level(xp: int) -> int:
    return max(1, xp // LEVEL_XP_STEP + 1)


def _update_streak(progress: dict):
    today = date.today().isoformat()
    last = progress.get("last_active_date")
    if last == today:
        pass  # already logged in today, streak unchanged
    elif last == (date.today() - timedelta(days=1)).isoformat():
        progress["streak"] += 1
    else:
        progress["streak"] = 1
    progress["last_active_date"] = today


def _award_badges(progress: dict):
    badges = set(progress.get("badges", []))
    if progress["streak"] >= 3:
        badges.add("3-Day Streak")
    if progress["streak"] >= 7:
        badges.add("7-Day Streak")
    if len(progress["completed_activities"]) >= 1:
        badges.add("First Steps")
    if len(progress["completed_activities"]) >= 10:
        badges.add("Dedicated Learner")
    if len(progress["completed_activities"]) >= 30:
        badges.add("Subject Master")
    progress["badges"] = list(badges)


@app.post("/activity/submit")
def submit_activity(req: ActivityResultRequest, user=Depends(require_role("student"))):
    activity, topic = _find_activity(req.activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    progress = storage.get_user_progress(user["username"])

    correct_count, total_count = _grade_activity(activity, req)
    accuracy = (correct_count / total_count) if total_count else 0
    base_xp = activity["xp"]
    earned_xp = round(base_xp * max(0.3, accuracy))  # partial credit, floor at 30%
    earned_coins = round(earned_xp / 2)

    first_time = req.activity_id not in progress["completed_activities"]
    if first_time:
        progress["completed_activities"].append(req.activity_id)
        progress["xp"] += earned_xp
        progress["coins"] += earned_coins
    else:
        # replaying gives reduced reward to discourage farming, but still lets them practice
        progress["xp"] += round(earned_xp * 0.2)
        progress["coins"] += round(earned_coins * 0.2)

    _update_streak(progress)
    progress["level"] = _calc_level(progress["xp"])
    progress["accuracy_log"].append({
        "activity_id": req.activity_id,
        "accuracy": accuracy,
        "time_taken_seconds": req.time_taken_seconds,
        "date": datetime.utcnow().isoformat(),
    })
    _award_badges(progress)

    storage.update_user_progress(user["username"], progress)

    return {
        "correct_count": correct_count,
        "total_count": total_count,
        "earned_xp": earned_xp,
        "earned_coins": earned_coins,
        "total_xp": progress["xp"],
        "level": progress["level"],
        "streak": progress["streak"],
        "badges": progress["badges"],
        "first_time_completion": first_time,
    }


# ---------------------------------------------------------------------------
# Dashboards
# ---------------------------------------------------------------------------

TOTAL_ACTIVITIES = sum(len(t["activities"]) for s in CONTENT.values() for t in s["topics"])


@app.get("/dashboard/student")
def student_dashboard(user=Depends(require_role("student"))):
    progress = storage.get_user_progress(user["username"])

    subject_progress = []
    for subject_key, subject in CONTENT.items():
        subject_total = sum(len(t["activities"]) for t in subject["topics"])
        subject_done = sum(
            1 for t in subject["topics"] for a in t["activities"]
            if a["id"] in progress["completed_activities"]
        )
        subject_progress.append({
            "subject": subject["subject_name"],
            "completed": subject_done,
            "total": subject_total,
        })

    # daily challenge: first not-yet-completed activity (deterministic, rule-based)
    daily_challenge = None
    for subject in CONTENT.values():
        for topic in subject["topics"]:
            for activity in topic["activities"]:
                if activity["id"] not in progress["completed_activities"]:
                    daily_challenge = {"id": activity["id"], "title": activity["title"], "topic": topic["name"], "xp": activity["xp"]}
                    break
            if daily_challenge:
                break
        if daily_challenge:
            break

    leaderboard_position = _get_leaderboard_position(user["username"])

    return {
        "display_name": _get_display_name(user["username"]),
        "level": progress["level"],
        "xp": progress["xp"],
        "coins": progress["coins"],
        "streak": progress["streak"],
        "badges": progress["badges"],
        "completed_count": len(progress["completed_activities"]),
        "total_activities": TOTAL_ACTIVITIES,
        "subject_progress": subject_progress,
        "daily_challenge": daily_challenge,
        "leaderboard_position": leaderboard_position,
    }


def _get_display_name(username):
    users = storage.get_users()
    return users.get(username, {}).get("display_name", username)


@app.get("/dashboard/teacher")
def teacher_dashboard(user=Depends(require_role("teacher"))):
    users = storage.get_users()
    progress_all = storage.get_progress()

    students = [u for u, info in users.items() if info["role"] == "student"]

    student_rows = []
    total_accuracy_sum = 0
    total_accuracy_n = 0
    daily_participation_today = 0
    today = date.today().isoformat()

    for username in students:
        p = progress_all.get(username, storage.get_user_progress(username))
        acc_log = p.get("accuracy_log", [])
        avg_acc = round(sum(a["accuracy"] for a in acc_log) / len(acc_log) * 100, 1) if acc_log else 0
        if acc_log:
            total_accuracy_sum += sum(a["accuracy"] for a in acc_log)
            total_accuracy_n += len(acc_log)
        if p.get("last_active_date") == today:
            daily_participation_today += 1

        student_rows.append({
            "username": username,
            "display_name": _get_display_name(username),
            "level": p["level"],
            "xp": p["xp"],
            "completed_activities": len(p["completed_activities"]),
            "total_activities": TOTAL_ACTIVITIES,
            "average_accuracy_percent": avg_acc,
            "streak": p["streak"],
        })

    student_rows.sort(key=lambda r: r["xp"], reverse=True)

    topic_completion = []
    for subject in CONTENT.values():
        for topic in subject["topics"]:
            topic_activity_ids = {a["id"] for a in topic["activities"]}
            completions = sum(
                1 for username in students
                for aid in progress_all.get(username, {}).get("completed_activities", [])
                if aid in topic_activity_ids
            )
            possible = len(students) * len(topic_activity_ids)
            topic_completion.append({
                "topic": topic["name"],
                "completion_percent": round((completions / possible) * 100, 1) if possible else 0,
            })

    return {
        "total_students": len(students),
        "average_accuracy_percent": round((total_accuracy_sum / total_accuracy_n) * 100, 1) if total_accuracy_n else 0,
        "daily_activity_participation": daily_participation_today,
        "students": student_rows,
        "topic_completion": topic_completion,
    }


# ---------------------------------------------------------------------------
# Leaderboard
# ---------------------------------------------------------------------------

def _get_leaderboard_position(username):
    board = _build_leaderboard()
    for i, row in enumerate(board):
        if row["username"] == username:
            return i + 1
    return None


def _build_leaderboard():
    users = storage.get_users()
    progress_all = storage.get_progress()
    rows = []
    for username, info in users.items():
        if info["role"] != "student":
            continue
        p = progress_all.get(username, storage.get_user_progress(username))
        rows.append({
            "username": username,
            "display_name": info["display_name"],
            "xp": p["xp"],
            "level": p["level"],
            "completed_activities": len(p["completed_activities"]),
            "badges": len(p.get("badges", [])),
        })
    rows.sort(key=lambda r: r["xp"], reverse=True)
    return rows


@app.get("/leaderboard")
def leaderboard(user=Depends(get_current_user)):
    board = _build_leaderboard()
    for i, row in enumerate(board):
        row["rank"] = i + 1
    return board


@app.get("/")
def root():
    return {"status": "ok", "message": "NCERT Gamified Learning App API is running"}
