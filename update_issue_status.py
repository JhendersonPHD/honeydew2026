#!/usr/bin/env python3
import requests
import json

api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNGNjZTFkNS1lOTJmLTRkZTktOWM3OS00ZjIyYzFiODVlMzgiLCJjb21wYW55X2lkIjoiYWU5ZDRkZjEtOGU1MS00NmYzLWFkNjAtMGUxNThiNjE1M2I3IiwiYWRhcHRlcl90eXBlIjoiaGVybWVzX2xvY2FsIiwicnVuX2lkIjoiYmRjODVhZmUtMGFkYy00YjVjLThhYmUtYTU0OWZhYjA0NzRkIiwiaWF0IjoxNzc2OTQyNDAxLCJleHAiOjE3NzcxMTUyMDEsImlzcyI6InBhcGVyY2xpcCIsImF1ZCI6InBhcGVyY2xpcC1hcGkifQ.BkM2vtef2tr0TE0yIcO6ykG4KxaMgf1isaNFvk9GSIA'
issue_id = '214391b0-6692-46f3-9be1-60d9cbbf1438'
run_id = 'bdc85afe-0adc-4b5c-8abe-a549fab0474d'

comment = '''## S4.3 AI Integration — Work Already Complete

**Status:** Issue cancelled but work completed via PR #12

### Verification:
- **Git commit:** 8437531 "Jules AI Integration (Recreated) (#12)"
- **Branch:** feature/jules-ai-integration (merged to main)
- **PR:** #12 merged 2026-04-16
- **Pipeline status:** S4 COMPLETE (all 5 PRs merged)

### What was implemented:
The AI Integration for honeydew2026 was completed through a recreated Jules session after the initial session encountered issues. All S4.3 work is merged into main.

### Current State:
- S4: COMPLETE
- Backend (port 8018): Running
- Frontend (port 3016): Running
- S9: COMPLETE
- S10: PENDING (Launch sequence)

**Note:** Issue was cancelled at 2026-04-23T11:01:39 but work was already completed via the recreated session (commit 8437531). No further action required on this issue.
'''

resp = requests.post(
    f'http://localhost:3132/api/issues/{issue_id}/comments',
    headers={
        'Authorization': f'Bearer {api_key}',
        'X-Paperclip-Run-Id': run_id,
        'Content-Type': 'application/json'
    },
    json={'body': comment}
)
print('Status:', resp.status_code)
print('Response:', resp.text[:500] if len(resp.text) > 500 else resp.text)
