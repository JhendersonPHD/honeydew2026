import sys, json

try:
    d = json.loads('{"data": [], "items": []}')
    res = d['data'] if isinstance(d, dict) else True
    print("RESULT IS", res)
except Exception as e:
    print("ERROR", str(e))
