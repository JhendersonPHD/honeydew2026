from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UserPreferenceProfile(BaseModel):
    user_id: int
    favorite_categories: List[int] = []
    favorite_farms: List[int] = []
    price_range_min: Optional[float] = None
    price_range_max: Optional[float] = None
    dietary_preferences: List[str] = []

class Recommendation(BaseModel):
    product_id: int
    score: float
    reason: str

class SearchSuggestion(BaseModel):
    query: str
    confidence: float
    category_id: Optional[int] = None
