from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.services.ai_service import ai_service
from app.models.ai_models import Recommendation
# Assuming products are fetched via some db model, we use a mock/simple query for now
import random

class RecommendationEngine:
    def __init__(self):
        pass

    def get_personalized_recommendations(self, user_id: int, limit: int = 6) -> List[dict]:
        """
        Returns personalized product suggestions.
        Mock implementation.
        """
        ai_service.log_decision("personalized_recommendation", {"user_id": user_id}, "mock_generation")

        # In a real scenario, fetch user history and use AI to predict next products
        # For this prototype, we'll return a static/mocked structure
        recommendations = [
            {"product_id": i, "score": round(random.uniform(0.7, 0.99), 2), "reason": "Based on your past purchases"}
            for i in range(1, limit + 1)
        ]
        return recommendations

    def get_cart_recommendations(self, cart_items: List[Dict[str, Any]], limit: int = 4) -> List[dict]:
        """
        Returns 'Complete your meal' suggestions.
        """
        ai_service.log_decision("cart_recommendation", {"cart_items": cart_items}, "mock_generation")

        # Mock logic
        recommendations = [
            {"product_id": i + 10, "score": round(random.uniform(0.7, 0.99), 2), "reason": "Frequently bought together"}
            for i in range(1, limit + 1)
        ]
        return recommendations

    def get_similar_products(self, product_id: int, limit: int = 6) -> List[dict]:
        """
        Returns 'You might also like' suggestions.
        """
        ai_service.log_decision("similar_products", {"product_id": product_id}, "mock_generation")

        # Mock logic
        recommendations = [
            {"product_id": product_id + i, "score": round(random.uniform(0.7, 0.99), 2), "reason": "Similar to what you're viewing"}
            for i in range(1, limit + 1)
        ]
        return recommendations

recommendation_engine = RecommendationEngine()
