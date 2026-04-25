from fastapi import APIRouter, Depends, Body
from typing import Dict, Any, List
from app.services.personalization_engine import personalization_engine

router = APIRouter()

# A mock dependency since the auth structure in this repo isn't fully using Depends(get_current_user)
def mock_get_current_user():
    return {"id": 1, "email": "test@example.com"}

@router.get("/profile")
def get_profile(user: dict = Depends(mock_get_current_user)):
    """Get the current user's preference profile."""
    return personalization_engine.get_user_profile(user.get("id"))

@router.post("/track")
def track_interaction(payload: Dict[str, Any] = Body(...), user: dict = Depends(mock_get_current_user)):
    """Track a user interaction to build their profile."""
    interaction_type = payload.get("interaction_type")
    item_id = payload.get("item_id")
    metadata = payload.get("metadata", {})

    if not interaction_type or not item_id:
        return {"status": "error", "message": "Missing required fields: interaction_type, item_id"}

    personalization_engine.track_interaction(user.get("id"), interaction_type, item_id, metadata)
    return {"status": "success"}

@router.get("/home-sections")
def get_home_sections(user: dict = Depends(mock_get_current_user)):
    """Get personalized homepage sections."""
    return personalization_engine.get_home_sections(user.get("id"))
