from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db, NPSFeedback

router = APIRouter()

class NPSRequest(BaseModel):
    score: int
    comments: str = ""

@router.post("/nps")
def submit_nps(request: NPSRequest, db: Session = Depends(get_db)):
    nps = NPSFeedback(user_id=1, score=request.score, comments=request.comments)
    db.add(nps)
    db.commit()
    return {"success": True, "id": nps.id}

@router.post("/product")
def submit_product_feedback():
    return {"success": True}

@router.get("/types")
def get_feedback_types():
    return [{"id": "nps", "name": "NPS"}, {"id": "product", "name": "Product Review"}]
