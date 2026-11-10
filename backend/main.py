import os, time
from typing import Literal
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, JSONResponse
from groq import Groq
from pydantic import BaseModel, Field, model_validator
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from prompt import SYSTEM_PROMPT
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

DAILY_CAP = int(os.getenv("DAILY_CAP", "300"))
usage = {"day": time.strftime("%Y-%m-%d"), "count": 0}

def over_daily_cap() -> bool:
    today = time.strftime("%Y-%m-%d")
    if usage["day"] != today:
        usage["day"], usage["count"] = today, 0
    usage["count"] += 1
    return usage["count"] > DAILY_CAP

def client_ip(request: Request) -> str:
    # On Render all traffic comes through a proxy, so read the forwarded header
    fwd = request.headers.get("x-forwarded-for")
    return fwd.split(",")[0].strip() if fwd else request.client.host

limiter = Limiter(key_func=client_ip)
app = FastAPI()
app.state.limiter = limiter

# Add CORS middleware
ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RateLimitExceeded)
async def too_many(request: Request, exc: RateLimitExceeded):
    return JSONResponse({"detail": "rate_limited"}, status_code=429)

MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
API = os.getenv("GROQ_API_KEY")
CLIENT = Groq(api_key=API)
EXTRA = {"reasoning_effort": "low"} if "gpt-oss" in MODEL else {}

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(max_length=4000)

    @model_validator(mode="after")
    def limit_user_length(self):
        if self.role == "user" and len(self.content) > 500:
            raise ValueError("Message too long (max 500 characters)")
        return self

class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1, max_length=20)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
@limiter.limit("10/minute;60/hour")
def chat(request: Request, body: ChatRequest):
    if over_daily_cap():
        return JSONResponse({"detail": "daily_cap"}, status_code=503)

    history = [
        {"role": m.role, "content": m.content[:1500] if m.role == "assistant" else m.content}
        for m in body.messages[-10:]
    ]

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history       

    def token_stream():
        try:
            stream = CLIENT.chat.completions.create(
                model=MODEL,
                messages=messages,
                temperature=0.3,
                max_completion_tokens=1024,
                stream=True,
                **EXTRA,
            )
            for chunk in stream:
                if not chunk.choices:
                    continue
                text = chunk.choices[0].delta.content
                if text:
                    yield text
        except Exception:
            yield "\n\nSorry, something went wrong. Please try again in a moment."

    return StreamingResponse(token_stream(), media_type="text/plain")
