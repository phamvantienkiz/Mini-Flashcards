from fastapi import APIRouter
from app.api.v1.endpoints import flashcards, health, learning

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["Flashcards"])
api_router.include_router(learning.router, prefix="/learning", tags=["Learning"])
