# MindSpace

MindSpace is a mental wellness companion built with React + Vite on the frontend, and a Python FastAPI backend for persisting chat, mood, and reflection data. The AI assistant is powered by **Groq (Llama 3.3)**.

---

## 🚀 Running the Frontend

```bash
# from the repo root
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and proxies API requests to `http://localhost:8000/api`.

---

## 🧠 Running the Backend (Python)

The backend enables persistence of chat history, mood logs, and reflections, and powers the AI assistant via Groq.

### 1) Create a Python virtual environment

```bash
cd backend
python -m venv .venv
```

Activate it:

```bash
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

### 2) Install dependencies

```bash
pip install -r requirements.txt
```

If `groq` is not in `requirements.txt`, install it manually:

```bash
pip install groq
```

### 3) Configure environment variables

Create a `.env` file inside the `backend/` folder:

```dotenv
# Database
DATABASE_URL=mysql+pymysql://root:root@localhost/mindspace

# Groq AI
GROQ_API_KEY=your-groq-api-key-here
```

Get your free Groq API key at https://console.groq.com.

> ⚠️ Never commit your `.env` file to a public repository.

### 4) Start the API server

Run this from the **repo root** (not inside the `backend/` folder).

**Option A — Activate the venv first (recommended):**
```powershell
# Windows PowerShell
& "backend\.venv\Scripts\Activate.ps1"
uvicorn backend.api:app --reload
```

**Option B — Use the full path directly (no activation needed):**
```powershell
# Windows PowerShell
& "C:\Users\<YourUsername>\Desktop\MindSpace\mindspace\backend\.venv\Scripts\python.exe" -m uvicorn backend.api:app --reload

# macOS / Linux
uvicorn backend.api:app --reload
```

> 💡 If you get a `CommandNotFoundException` on Windows, make sure to use `& "..."` (with the call operator) when the path contains spaces.

The API will be available at http://localhost:8000.

---

## 🧩 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Sign in and get a token | No |
| GET | `/api/auth/me` | Get current user info | Yes |
| GET | `/api/chat/history` | Get chat history | Yes |
| POST | `/api/chat/message` | Send a message to the AI | Yes |
| GET | `/api/mood` | Get mood logs | Yes |
| POST | `/api/mood` | Log a mood entry | Yes |
| GET | `/api/reflection` | Get reflections | Yes |
| POST | `/api/reflection` | Save a reflection | Yes |

---

## 🤖 AI Assistant

The chat feature is powered by **Groq** using the `llama-3.3-70b-versatile` model. The assistant is designed to:

- Help users reflect on their feelings
- Suggest coping strategies (breathing exercises, journaling)
- Respond in a calm, non-judgmental way
- Recommend professional help when needed

> MindSpace is not a replacement for professional therapy.

---

## 🗄️ Database

MindSpace uses **MySQL** via SQLAlchemy. Make sure your MySQL server is running and the `mindspace` database exists before starting the backend.

```sql
CREATE DATABASE mindspace;
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI + Uvicorn |
| Database | MySQL + SQLAlchemy |
| AI | Groq (Llama 3.3) |
| Auth | JWT (python-jose) |
