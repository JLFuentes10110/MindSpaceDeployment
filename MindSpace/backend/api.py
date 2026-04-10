"""FastAPI backend for MindSpace.

Provides endpoints used by the React frontend and the Streamlit admin UI.
"""

import os
from typing import Optional

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator

from .auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    get_current_user_from_token,
    register_user,
)
from .data_store import (
    add_chat_message,
    add_mood_log,
    add_reflection,
    get_chat_history,
    get_mood_logs,
    get_reflections,
    generate_assistant_reply,
)


app = FastAPI(title="MindSpace Backend")

# Allow calls from the Vite dev server and Streamlit UI.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8501",
    "http://127.0.0.1:8501",
    "https://yourmindspace.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthIn(BaseModel):
    email: str
    password: str

    @validator('email')
    def email_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Email cannot be empty')
        return v.strip()

    @validator('password')
    def password_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Password cannot be empty')
        return v


class MessageIn(BaseModel):
    text: str


class MoodIn(BaseModel):
    mood: str


class ReflectionIn(BaseModel):
    prompt: str
    text: str


def _get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header")

    user = get_current_user_from_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    return user


@app.post("/api/auth/register", response_model=Token)
def register(auth: AuthIn):
    user = register_user(auth.email, auth.password)
    if not user:
        raise HTTPException(status_code=400, detail="User already exists")

    access_token = create_access_token({"sub": user["id"]})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/auth/login", response_model=Token)
def login(auth: AuthIn):
    user = authenticate_user(auth.email, auth.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": user["id"]})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/auth/me")
def me(user=Depends(_get_current_user)):
    return {"id": user.get("id"), "email": user.get("email")}


@app.get("/api/chat/history")
def chat_history(user=Depends(_get_current_user)):
    return get_chat_history(user["id"])


@app.post("/api/chat/message")
def send_chat_message(message: MessageIn, user=Depends(_get_current_user)):
    add_chat_message(user["id"], "user", message.text)
    assistant_msg = add_chat_message(user["id"], "assistant", generate_assistant_reply(message.text))

    response = {
        "assistant": {
            "id": assistant_msg["id"],
            "text": assistant_msg["message"],
            "sender": assistant_msg["sender"],
            "timestamp": assistant_msg["timestamp"],
        }
    }
    print(f"[chat] returning: {response}")
    return response


@app.get("/api/chat/debug")
def chat_debug():
    openai_key = os.environ.get("OPENAI_API_KEY")
    key_exist = bool(openai_key)
    return {
        "openai_key_present": key_exist,
        "openai_key_starts_with_sk": openai_key.startswith("sk-") if openai_key else False,
        "system_message_example": "I am here to help you reflect on your feelings.",
    }


@app.get("/api/mood")
def get_mood(user=Depends(_get_current_user)):
    return get_mood_logs(user["id"])


@app.post("/api/mood")
def post_mood(payload: MoodIn, user=Depends(_get_current_user)):
    return add_mood_log(user["id"], payload.mood)


@app.get("/api/reflection")
def get_reflection(user=Depends(_get_current_user)):
    return get_reflections(user["id"])


@app.post("/api/reflection")
def post_reflection(payload: ReflectionIn, user=Depends(_get_current_user)):
    return add_reflection(user["id"], payload.prompt, payload.text)
