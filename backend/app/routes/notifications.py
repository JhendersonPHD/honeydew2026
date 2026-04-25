from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db, NotificationPreference, StockAlert

router = APIRouter()

class PrefRequest(BaseModel):
    order_updates: bool
    promotions: bool
    farm_news: bool
    back_in_stock: bool

@router.get("/preferences")
def get_notification_preferences(db: Session = Depends(get_db)):
    user_id = 1
    pref = db.query(NotificationPreference).filter(NotificationPreference.user_id == user_id).first()
    if not pref:
        pref = NotificationPreference(user_id=user_id)
        db.add(pref)
        db.commit()
        db.refresh(pref)
    return {
        "order_updates": pref.order_updates,
        "promotions": pref.promotions,
        "farm_news": pref.farm_news,
        "back_in_stock": pref.back_in_stock
    }

@router.put("/preferences")
def update_notification_preferences(request: PrefRequest, db: Session = Depends(get_db)):
    user_id = 1
    pref = db.query(NotificationPreference).filter(NotificationPreference.user_id == user_id).first()
    if not pref:
        pref = NotificationPreference(user_id=user_id)
        db.add(pref)

    pref.order_updates = request.order_updates
    pref.promotions = request.promotions
    pref.farm_news = request.farm_news
    pref.back_in_stock = request.back_in_stock

    db.commit()
    return {"success": True}

class StockAlertRequest(BaseModel):
    product_id: int
    email: str

@router.post("/stock-alert")
def signup_stock_alert(request: StockAlertRequest, db: Session = Depends(get_db)):
    alert = StockAlert(user_id=1, product_id=request.product_id, email=request.email)
    db.add(alert)
    db.commit()
    return {"success": True, "id": alert.id}
