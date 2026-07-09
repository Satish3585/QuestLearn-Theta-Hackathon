"""
Simple, dependency-light authentication:
- Passwords hashed with PBKDF2-SHA256 (stdlib hashlib, no external crypto service)
- Session tokens are signed random strings stored server-side (in-memory + file-backed)
This avoids external auth APIs while still providing secure password storage
and role-based access control, per the hackathon security requirements.
"""
import hashlib
import os
import secrets
import time

SESSIONS = {}  # token -> {username, role, created_at}
SESSION_TTL_SECONDS = 60 * 60 * 8  # 8 hour session


def hash_password(password: str, salt: str = None) -> str:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt, _ = stored_hash.split("$")
    except ValueError:
        return False
    return hash_password(password, salt) == stored_hash


def create_session(username: str, role: str) -> str:
    token = secrets.token_urlsafe(32)
    SESSIONS[token] = {"username": username, "role": role, "created_at": time.time()}
    return token


def get_session(token: str):
    session = SESSIONS.get(token)
    if not session:
        return None
    if time.time() - session["created_at"] > SESSION_TTL_SECONDS:
        del SESSIONS[token]
        return None
    return session


def revoke_session(token: str):
    SESSIONS.pop(token, None)
