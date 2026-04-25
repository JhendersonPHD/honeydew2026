curl -s "http://localhost:8017/api/farms/" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data'] if isinstance(d, dict) else True)" > /dev/null 2>&1
echo $?
