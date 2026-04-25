from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def get_cart():
    return []

@router.post("/")
def add_to_cart():
    return []

@router.patch("/{item_id}")
def update_cart(item_id: int):
    return []

@router.delete("/{item_id}")
def remove_from_cart(item_id: int):
    return []
