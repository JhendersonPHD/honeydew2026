from fastapi import APIRouter, Depends
from typing import Dict, Any

router = APIRouter()

@router.post("/register")
def register():
    return {"message": "Not implemented"}

@router.post("/login")
def login():
    return {"access_token": "mock-token", "token_type": "bearer"}

@router.get("/me")
def get_me():
    return {"id": 1, "email": "test@example.com"}
