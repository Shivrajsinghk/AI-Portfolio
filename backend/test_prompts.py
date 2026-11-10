import json
import urllib.request

def ask(q):
    body = json.dumps({"messages": [{"role": "user", "content": q}]}).encode()
    req = urllib.request.Request(
        "http://127.0.0.1:8000/chat", data=body,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode()

questions = [l.strip() for l in open("questions.txt", encoding="utf-8") if l.strip()]
with open("test_results.md", "w", encoding="utf-8") as out:
    for i, q in enumerate(questions, 1):
        print(i, q)
        out.write(f"## {i}. {q}\n\n{ask(q)}\n\n---\n\n")