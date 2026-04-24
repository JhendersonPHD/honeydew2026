#!/usr/bin/env python3
"""Paperclip API helper for honeydew2026 VEX-1014"""
import urllib.request, urllib.error, json

issue_id = 'd0529e4b-8f8e-414c-a2ce-5dfae3cc1d04'
run_id = '8cdf2b40-4cf6-49ba-b2a3-dc085f7e7d63'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZTZlZDk0Mi1mNWRmLTRhNzgtYWNhMi00ODA1MmNkNGQ4YTMiLCJjb21wYW55X2lkIjoiYWU5ZDRkZjEtOGU1MS00NmYzLWFkNjAtMGUxNThiNjE1M2I3IiwiYWRhcHRlcl90eXBlIjoiaGVybWVzX2xvY2FsIiwicnVuX2lkIjoiOGNkZjJiNDAtNGNmNi00OWJhLWIyYTMtZGMwODVmN2U3ZDYzIiwiaWF0IjoxNzc2OTg1NTkwLCJleHAiOjE3NzcxNTgzOTAsImlzcyI6InBhcGVyY2xpcCIsImF1ZCI6InBhcGVyY2xpcC1hcGkifQ.Aaysun13ahmfORjbn24WKDuTkzIA4GW9OW9jyP3EYBg'

base = 'http://localhost:3132/api'

def api_get(path):
    req = urllib.request.Request(
        f'{base}{path}',
        headers={'Authorization': f'Bearer {token}'}
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode())

def api_patch(path, data):
    req = urllib.request.Request(
        f'{base}{path}',
        method='PATCH',
        headers={
            'Authorization': f'Bearer {token}',
            'X-Paperclip-Run-Id': run_id,
            'Content-Type': 'application/json'
        },
        data=json.dumps(data).encode()
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode())

def api_post(path, data):
    req = urllib.request.Request(
        f'{base}{path}',
        method='POST',
        headers={
            'Authorization': f'Bearer {token}',
            'X-Paperclip-Run-Id': run_id,
            'Content-Type': 'application/json'
        },
        data=json.dumps(data).encode()
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode())

if __name__ == '__main__':
    import sys
    action = sys.argv[1] if len(sys.argv) > 1 else 'status'
    
    if action == 'status':
        d = api_get(f'/issues/{issue_id}')
        print(f"Status: {d['status']}")
        print(f"Assignee: {d.get('assigneeAgentId', 'none')}")
    
    elif action == 'transition':
        new_status = sys.argv[2] if len(sys.argv) > 2 else 'in_progress'
        result = api_patch(f'/issues/{issue_id}', {'status': new_status})
        print(f"Transitioned to: {result.get('status')}")
    
    elif action == 'comment':
        comment = sys.argv[2] if len(sys.argv) > 2 else 'Smoke test PASS. Services running.'
        result = api_post(f'/issues/{issue_id}/comments', {'body': comment})
        print(f"Comment posted: {result.get('id', 'ok')}")
    
    elif action == 'complete':
        # Transition to done
        result = api_patch(f'/issues/{issue_id}', {'status': 'done'})
        print(f"Marked done: {result.get('status')}")
