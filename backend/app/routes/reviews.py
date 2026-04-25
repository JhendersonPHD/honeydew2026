from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/product/{product_id}")
def get_reviews(product_id: int):
    return []

@router.post("/")
def create_review():
    return {"id": 1}
