from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.database import engine, Base
from app.routes import (
    auth, products, farms, categories, cart, orders, reviews,
    referrals, rewards, feedback, notifications, themes
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HoneyDew 2026 API")

origins = os.getenv("CORS_ORIGINS", "http://localhost:3016,http://localhost:3017,http://localhost:3021").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(farms.router, prefix="/api/farms", tags=["farms"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])
app.include_router(referrals.router, prefix="/api/referrals", tags=["referrals"])
app.include_router(rewards.router, prefix="/api/rewards", tags=["rewards"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["feedback"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])
app.include_router(themes.router, prefix="/api/themes", tags=["themes"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
