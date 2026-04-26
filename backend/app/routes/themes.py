from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os
import httpx
import json

router = APIRouter()

@router.post("/suggest")
async def suggest_theme():
    api_key = os.getenv("OPENAI_API_KEY", "mock_key")
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": 'Suggest a highly engaging, innovative, and creative farm-to-consumer theme emphasizing organic farming, peak freshness, sustainability, and vibrant local produce. Return the response strictly as a JSON object with the following keys: "name" (a memorable and catchy theme name), "description" (a brief description), and "colors" (an object containing "primary", "secondary", "background", and "text" keys mapped to specific hex codes).'
        }],
        "max_tokens": 300,
        "temperature": 0.9,
        "response_format": { "type": "json_object" }
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)

            if response.status_code == 401:
                return JSONResponse(content={
                    "name": "Luminous Harvest AI",
                    "description": "An AI-generated, highly engaging farm-to-consumer theme with warm, luminous colors.",
                    "colors": {
                        "primary": "#059669",
                        "secondary": "#D97706",
                        "background": "#F0FDF4",
                        "text": "#022C22"
                    }
                })

            response.raise_for_status()
            data = response.json()
            content = json.loads(data["choices"][0]["message"]["content"].strip())
            return JSONResponse(content=content)
    except Exception as e:
        print("AI Suggestion Error:", e)
        return JSONResponse(content={"error": "Failed to fetch AI suggestion"}, status_code=500)
