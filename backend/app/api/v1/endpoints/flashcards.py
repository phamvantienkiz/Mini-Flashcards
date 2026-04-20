from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.flashcard_service import FlashcardService
from app.schemas.flashcard import (
    Flashcard, 
    FlashcardCreate, 
    FlashcardUpdate, 
    FlashcardListResponse,
    Pagination
)

router = APIRouter()

@router.get("/", response_model=FlashcardListResponse)
def read_flashcards(
    offset: int = 0,
    limit: int = 20,
    q: Optional[str] = None,
    topic_id: Optional[UUID] = None,
    db: Session = Depends(get_db)
):
    service = FlashcardService(db)
    data, total = service.get_flashcards(offset=offset, limit=limit, q=q, topic_id=topic_id)

    return FlashcardListResponse(
        data=data,
        pagination=Pagination(
            total=total,
            offset=offset,
            limit=limit
        )
    )

@router.post("", response_model=Flashcard, status_code=status.HTTP_201_CREATED)
def create_flashcard(
    obj_in: FlashcardCreate,
    db: Session = Depends(get_db)
):
    service = FlashcardService(db)
    return service.create_flashcard(obj_in)

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    service = FlashcardService(db)
    _, total = service.get_flashcards(limit=0)
    return {"total_count": total}

@router.get("/{id}", response_model=Flashcard)
def get_flashcard(
    id: UUID,
    db: Session = Depends(get_db)
):
    service = FlashcardService(db)
    db_obj = service.get_flashcard(id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return db_obj

@router.patch("/{id}", response_model=Flashcard)
def update_flashcard(
    id: UUID,
    obj_in: FlashcardUpdate,
    db: Session = Depends(get_db)
):
    service = FlashcardService(db)
    db_obj = service.update_flashcard(id, obj_in)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return db_obj

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_flashcard(
    id: UUID,
    db: Session = Depends(get_db)
):
    service = FlashcardService(db)
    if not service.delete_flashcard(id):
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return None
