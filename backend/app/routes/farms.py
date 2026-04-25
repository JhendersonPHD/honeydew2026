from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_farms():
    return [{"id": 1, "name": "Mock Farm"}]

@router.get("/{id}")
def get_farm(id: int):
    return {"id": id, "name": "Mock Farm"}
