import json, urllib.request, urllib.error

for i in range(12):
    req = urllib.request.Request(
        "http://127.0.0.1:8000/chat",
        data=json.dumps({"messages": [{"role": "user", "content": "hi"}]}).encode(),
        headers={"Content-Type": "application/json"},
    )
    try:
        urllib.request.urlopen(req).read()
        print(i + 1, 200)
    except urllib.error.HTTPError as e:
        print(i + 1, e.code)