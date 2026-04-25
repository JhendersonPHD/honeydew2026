from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_products():
    return [
        {
            "id": 1,
            "name": "Mock Product",
            "price": 9.99,
            "farm": {"name": "Mock Farm"},
            "category": {"name": "Mock Category"},
            "category_id": 1
        }
    ]

@router.get("/{id}")
def get_product(id: int):
    return {"id": id, "name": "Mock Product"}
