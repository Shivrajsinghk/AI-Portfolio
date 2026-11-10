# Shivraj's AI Portfolio

A Windows 7-themed portfolio where recruiters can chat with **Neo**, an AI assistant that answers questions about my skills, projects, experience and background, using only facts I wrote down.

**Live demo:** `<your-frontend-url>`

![Screenshot](./screenshot.png)

## Features

- **Chat with Neo:** streamed answers about my resume, projects, internship and HR-style questions
- **Grounded answers:** Neo answers only from my own knowledge files and says "not listed" instead of guessing
- **Windows 7 look:** Aero-style glass chat window, desktop icons for projects, taskbar with quick links
- **Safe to expose publicly:** per-IP rate limiting, daily request cap, input length limits, locked-down message roles
- **Mobile friendly:** the chat opens full-width on phones

## How it works

```
React (Vite + Tailwind)  --POST /chat-->  FastAPI  -->  Groq (gpt-oss-120b)
        ^                                   |
        |------- streamed tokens -----------|
                          system prompt = rules + 4 knowledge files
```

1. Four Markdown files (`resume.md`, `projects.md`, `hr_faq.md`, `personal.md`) are loaded once at startup and combined with a set of rules into the system prompt.
2. The frontend sends the last 10 messages on each request, since the LLM API is stateless.
3. The backend streams the model's tokens back and the UI appends them live.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, Tailwind CSS, react-markdown |
| Backend | Python, FastAPI, Pydantic, slowapi |
| LLM | Groq API (`openai/gpt-oss-120b`) |
| Deployment | Docker, Railway |

## Design decisions

- **No RAG or vector database.** My whole profile fits in a few thousand tokens, so it goes straight into the system prompt. Simpler and more reliable than retrieval at this size.
- **Third-person voice.** Neo speaks about me instead of pretending to be me, so a wrong answer can't read as me lying.
- **Hallucination control.** The prompt forbids inventing skills, dates or numbers. Technologies I haven't worked with are listed explicitly so Neo can say so clearly.
- **Privacy red lines.** No phone number, address or family details. Salary questions are deflected to email.
- **Prompt-injection hardening.** Rules tell Neo to ignore instruction overrides, and the API only accepts `user` and `assistant` roles, so clients can't inject a fake `system` message.
- **Cost protection.** 10 requests/minute and 60/hour per IP, a global daily cap, 500-character user messages, capped output tokens, and truncated assistant history.
- **Tested before shipping.** The prompt was checked against about 30 recruiter, personal and jailbreak-style questions.

## Project structure

```
AI-Portfolio/
  backend/
    main.py            # FastAPI app: /chat, /health, CORS, rate limiting
    prompt.py          # builds the system prompt from the knowledge files
    knowledge/         # resume.md, projects.md, hr_faq.md, personal.md
    requirements.txt
    Dockerfile
  frontend/
    src/               # Desktop, components, modals, project data
    public/            # wallpaper and static files
    Dockerfile
```

## Run locally

**Prerequisites:** Python 3.11+, Node 20+, a free [Groq API key](https://console.groq.com).

**Backend**
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```
Create a `.env` file in the project root:
```
GROQ_API_KEY=your_key_here
GROQ_MODEL=openai/gpt-oss-120b
```
Then:
```bash
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL (usually `http://localhost:5173`). In development, Vite proxies `/chat` to the backend on port 8000.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `GROQ_API_KEY` | backend | Groq API key (never exposed to the browser) |
| `GROQ_MODEL` | backend | Model ID, defaults to `openai/gpt-oss-120b` |
| `ALLOWED_ORIGINS` | backend | Comma-separated frontend URLs allowed by CORS |
| `DAILY_CAP` | backend | Max chat requests per day (default 300) |
| `VITE_API_URL` | frontend (build time) | Backend base URL in production |

## Deployment

Deployed as two services on Railway, each from its own Dockerfile:

1. **Backend** (root directory `backend`): set `GROQ_API_KEY`, `GROQ_MODEL`, and `ALLOWED_ORIGINS` to the frontend URL.
2. **Frontend** (root directory `frontend`): set `VITE_API_URL` to the backend URL. This value is baked in at build time, so redeploy after changing it.

## Reuse it for your own portfolio

Replace the four files in `backend/knowledge/` with your own details, update the contact info and the rules in `prompt.py`, edit `frontend/src/projects.js`, and swap the wallpaper.

## Author

**Shivraj Singh Kushwah**: [GitHub](https://github.com/Shivrajsinghk) · [LinkedIn](https://www.linkedin.com/in/shivrajsinghkushwah)