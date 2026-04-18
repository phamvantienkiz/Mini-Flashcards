from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.learning_service import LearningService
from app.schemas.flashcard import QuizQuestion, WritingPrompt

router = APIRouter()

@router.get("/quiz", response_model=List[QuizQuestion])
def get_quiz(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    service = LearningService(db)
    return service.get_quiz_questions(limit=limit)

@router.get("/writing", response_model=List[WritingPrompt])
def get_writing(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    service = LearningService(db)
    return service.get_writing_prompts(limit=limit)
