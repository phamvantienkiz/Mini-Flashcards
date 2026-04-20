from typing import List, Optional, Tuple
from uuid import UUID
from sqlalchemy.orm import Session
from app.repositories.flashcard_repo import FlashcardRepository
from app.schemas.flashcard import FlashcardCreate, FlashcardUpdate, Flashcard

class FlashcardService:
    def __init__(self, db: Session):
        self.repo = FlashcardRepository(db)

    def get_flashcards(self, offset: int = 0, limit: int = 20, q: Optional[str] = None, topic_id: Optional[UUID] = None) -> Tuple[List[Flashcard], int]:
        data = self.repo.get_all(offset=offset, limit=limit, q=q, topic_id=topic_id)
        total = self.repo.count(q=q, topic_id=topic_id)
        return data, total

    def get_flashcard(self, id: UUID) -> Optional[Flashcard]:
        return self.repo.get_by_id(id)

    def create_flashcard(self, obj_in: FlashcardCreate) -> Flashcard:
        return self.repo.create(obj_in)

    def update_flashcard(self, id: UUID, obj_in: FlashcardUpdate) -> Optional[Flashcard]:
        db_obj = self.repo.get_by_id(id)
        if not db_obj:
            return None
        return self.repo.update(db_obj, obj_in)

    def delete_flashcard(self, id: UUID) -> bool:
        return self.repo.delete(id)
