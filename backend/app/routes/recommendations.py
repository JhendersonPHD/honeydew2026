from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Dict, Any
from app.services.recommendation_engine import recommendation_engine

# A mock dependency since the auth structure in this repo isn't fully using Depends(get_current_user)
def mock_get_current_user():
    return {"id": 1, "email": "test@example.com"}

router = APIRouter()

@router.get("/personalized")
def get_personalized_recommendations(limit: int = 6, user: dict = Depends(mock_get_current_user)):
    """Get personalized product recommendations for a logged-in user."""
    return recommendation_engine.get_personalized_recommendations(user.get("id"), limit=limit)

@router.post("/cart")
def get_cart_recommendations(payload: Dict[str, Any] = Body(...), limit: int = 4):
    """Get recommendations based on current cart contents."""
    cart_items = payload.get("cart_items", [])
    return recommendation_engine.get_cart_recommendations(cart_items, limit=limit)

@router.get("/similar/{product_id}")
def get_similar_products(product_id: int, limit: int = 6):
    """Get products similar to the given product_id."""
    return recommendation_engine.get_similar_products(product_id, limit=limit)
