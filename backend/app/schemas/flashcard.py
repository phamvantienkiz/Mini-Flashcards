from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# Common Schemas
class FlashcardBase(BaseModel):
    english: str
    vietnamese: str

class FlashcardCreate(FlashcardBase):
    pass

class FlashcardUpdate(BaseModel):
    english: Optional[str] = None
    vietnamese: Optional[str] = None

class Flashcard(FlashcardBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Learning Schemas
class QuizQuestion(BaseModel):
    flashcard_id: UUID
    word: str
    options: list[str]
    correct_answer: str

class WritingPrompt(BaseModel):
    flashcard_id: UUID
    meaning: str
    word: str

# Pagination
class Pagination(BaseModel):
    total: int
    offset: int
    limit: int

class FlashcardListResponse(BaseModel):
    data: list[Flashcard]
    pagination: Pagination
