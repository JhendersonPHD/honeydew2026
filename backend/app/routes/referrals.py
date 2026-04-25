from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db, Referral, User

router = APIRouter()

@router.get("/stats")
def get_referral_stats(db: Session = Depends(get_db)):
    # Mocking user_id = 1 for now
    user_id = 1
    referrals = db.query(Referral).filter(Referral.referrer_id == user_id).all()
    count = len(referrals)
    rewards = sum([r.reward_earned for r in referrals])
    return {"code": f"REF-{user_id}HD", "count": count, "rewards": rewards}

@router.post("/apply")
def apply_referral_code(code: str, db: Session = Depends(get_db)):
    # Very basic placeholder logic for apply
    if code:
        return {"success": True, "message": "Applied successfully"}
    return {"success": False, "message": "Invalid code"}
