from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_farms():
    return {"items": []}

@router.get("/{id}")
def get_farm(id: int):
    return {"id": id, "name": "Mock Farm"}
