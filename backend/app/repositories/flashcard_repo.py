from typing import List, Optional
from uuid import UUID
from sqlalchemy import select, func, delete
from sqlalchemy.orm import Session
from app.models.flashcard import Flashcard
from app.schemas.flashcard import FlashcardCreate, FlashcardUpdate

class FlashcardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, offset: int = 0, limit: int = 20, q: Optional[str] = None, topic_id: Optional[UUID] = None) -> List[Flashcard]:
        query = select(Flashcard)
        if q:
            query = query.filter(
                (Flashcard.english.ilike(f"%{q}%")) | 
                (Flashcard.vietnamese.ilike(f"%{q}%"))
            )
        if topic_id:
            query = query.filter(Flashcard.topic_id == topic_id)
        return self.db.execute(query.offset(offset).limit(limit)).scalars().all()

    def count(self, q: Optional[str] = None, topic_id: Optional[UUID] = None) -> int:
        query = select(func.count(Flashcard.id))
        if q:
            query = query.filter(
                (Flashcard.english.ilike(f"%{q}%")) | 
                (Flashcard.vietnamese.ilike(f"%{q}%"))
            )
        if topic_id:
            query = query.filter(Flashcard.topic_id == topic_id)
        return self.db.execute(query).scalar() or 0

    def get_by_id(self, id: UUID) -> Optional[Flashcard]:
        return self.db.get(Flashcard, id)

    def create(self, obj_in: FlashcardCreate) -> Flashcard:
        db_obj = Flashcard(
            english=obj_in.english,
            vietnamese=obj_in.vietnamese,
            example_sentence=obj_in.example_sentence,
            topic_id=obj_in.topic_id
        )
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def update(self, db_obj: Flashcard, obj_in: FlashcardUpdate) -> Flashcard:
        update_data = obj_in.model_dump(exclude_unset=True)
        for field in update_data:
            setattr(db_obj, field, update_data[field])
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def delete(self, id: UUID) -> bool:
        db_obj = self.get_by_id(id)
        if not db_obj:
            return False
        self.db.delete(db_obj)
        self.db.commit()
        return True

    def get_random(self, limit: int = 10, topic_id: Optional[UUID] = None) -> List[Flashcard]:
        query = select(Flashcard)
        if topic_id:
            query = query.filter(Flashcard.topic_id == topic_id)
        return self.db.execute(
            query.order_by(func.random()).limit(limit)
        ).scalars().all()
