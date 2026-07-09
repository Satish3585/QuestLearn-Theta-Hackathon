"""
Lightweight JSON-file based storage.
Chosen over a full database server to satisfy the hackathon's
'low-cost / minimal infrastructure' non-functional requirement.
Swappable for SQLite/Postgres later without changing the API layer.
"""
import json
import os
from threading import Lock

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

USERS_FILE = os.path.join(DATA_DIR, "users.json")
PROGRESS_FILE = os.path.join(DATA_DIR, "progress.json")

_lock = Lock()


def _load(path):
    if not os.path.exists(path):
        return {}
    with open(path, "r") as f:
        content = f.read().strip()
        return json.loads(content) if content else {}


def _save(path, data):
    with _lock:
        with open(path, "w") as f:
            json.dump(data, f, indent=2)


def get_users():
    return _load(USERS_FILE)


def save_users(users):
    _save(USERS_FILE, users)


def get_progress():
    return _load(PROGRESS_FILE)


def save_progress(progress):
    _save(PROGRESS_FILE, progress)


def get_user_progress(username):
    progress = get_progress()
    if username not in progress:
        progress[username] = {
            "xp": 0,
            "coins": 0,
            "level": 1,
            "streak": 0,
            "last_active_date": None,
            "completed_activities": [],
            "badges": [],
            "accuracy_log": []
        }
        save_progress(progress)
    return progress[username]


def update_user_progress(username, data):
    progress = get_progress()
    progress[username] = data
    save_progress(progress)
