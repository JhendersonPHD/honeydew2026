from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_products():
    return {"items": []}

@router.get("/{id}")
def get_product(id: int):
    return {"id": id, "name": "Mock Product"}
