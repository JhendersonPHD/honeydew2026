from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def get_orders():
    return []

@router.post("/")
def create_order():
    return {"id": 1}

@router.get("/{id}")
def get_order(id: int):
    return {"id": id}
