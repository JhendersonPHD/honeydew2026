from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db, RewardPoint

router = APIRouter()

@router.get("/balance")
def get_rewards_balance(db: Session = Depends(get_db)):
    user_id = 1
    points = db.query(RewardPoint).filter(RewardPoint.user_id == user_id).all()
    balance = sum([p.points for p in points if p.transaction_type == 'earned']) - sum([p.points for p in points if p.transaction_type == 'redeemed'])
    return {"balance": balance}

@router.get("/history")
def get_rewards_history(db: Session = Depends(get_db)):
    user_id = 1
    points = db.query(RewardPoint).filter(RewardPoint.user_id == user_id).all()
    return [{"points": p.points, "type": p.transaction_type, "date": p.created_at} for p in points]

@router.get("/tiers")
def get_rewards_tiers():
    return [
        {"name": "Bronze", "threshold": 0},
        {"name": "Silver", "threshold": 500},
        {"name": "Gold", "threshold": 1000}
    ]
