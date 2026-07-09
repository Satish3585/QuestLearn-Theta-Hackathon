# QuestLearn — Gamified NCERT Learning App
Hackathon submission for Theta Dynamics Private Limited

## What this is
A gamified learning platform for NCERT Class 10 Mathematics and Science, built for the
"Hiring Hackathon: Gamified Learning App for NCERT Students" problem statement.

- **5 topics × 2 subjects = 10 topics**
- **3 activities per topic = 30 total activities** (Quiz, Match the Following, Sequence Arrangement)
- Student dashboard, Teacher dashboard, Leaderboard
- XP, coins, levels, streaks, badges
- No external AI APIs used anywhere — all activities and grading logic are rule-based,
  authored directly in `backend/content.py`

## Tech Stack
- **Backend:** Python, FastAPI (open-source, lightweight — no paid infra needed)
- **Frontend:** React + Vite + Tailwind CSS
- **Storage:** Local JSON files (`backend/data/`) — zero database cost, easy to swap
  for SQLite/Postgres later without touching the API layer
- **Auth:** Custom PBKDF2 password hashing + server-side session tokens (no third-party auth service)

## How to run locally

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8123
```
Backend runs at `http://127.0.0.1:8123`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

Open `http://localhost:5173` in your browser. Register as a **Student** to try the
learning trail, or as a **Teacher** to see the class dashboard.

## How the "no external AI APIs" rule is satisfied
- Quiz questions, match pairs, and sequence steps are all hand-authored in `content.py`
- Grading logic (`_grade_activity` in `main.py`) is plain rule-based comparison —
  no model calls, no internet dependency for scoring
- Daily challenge selection is a deterministic rule (first incomplete activity),
  not an ML recommendation
- XP/level/streak/badge logic is fixed arithmetic and thresholds

## Deploying online (next step)
- **Backend:** Render, Railway, or Fly.io (free tier) — just point at `backend/`
- **Frontend:** Vercel or Netlify — set `VITE_API_URL` env var to the deployed backend URL,
  then `npm run build`
- Since storage is JSON-file based, make sure the backend host has a persistent disk
  (Render/Railway both support this on free tiers) — otherwise progress resets on redeploy

## Project structure
```
backend/
  main.py          — FastAPI app, all endpoints
  content.py        — 30 hand-authored activities across 10 NCERT topics
  storage.py        — JSON file storage layer
  auth.py           — password hashing + session management
  requirements.txt

frontend/
  src/
    pages/           — Login, Register, StudentDashboard, SubjectTrail,
                        ActivityPlayer, TeacherDashboard, Leaderboard
    components/      — Navbar, QuizActivity, MatchActivity, SequenceActivity
    context/          — AuthContext (session management)
    api.js            — API client
```

## Known simplifications (given hackathon timeframe)
- Storage is JSON-file based rather than a full database — intentional, for the
  "low-cost/minimal infrastructure" requirement, but should move to SQLite for
  production-scale concurrent writes
- No password reset flow
- Daily login streak resets are checked on activity submission, not via a background job
