from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_categories():
    return [{"id": 1, "name": "Mock Category"}]
