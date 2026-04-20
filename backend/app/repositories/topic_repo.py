from typing import List, Optional
from uuid import UUID
from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.models.topic import Topic
from app.schemas.topic import TopicCreate, TopicUpdate

class TopicRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, offset: int = 0, limit: int = 100) -> List[Topic]:
        query = select(Topic).order_by(Topic.is_predefined.desc(), Topic.name.asc())
        return self.db.execute(query.offset(offset).limit(limit)).scalars().all()

    def count(self) -> int:
        query = select(func.count(Topic.id))
        return self.db.execute(query).scalar() or 0

    def get_by_id(self, id: UUID) -> Optional[Topic]:
        return self.db.get(Topic, id)

    def get_by_name(self, name: str) -> Optional[Topic]:
        query = select(Topic).filter(Topic.name == name)
        return self.db.execute(query).scalar_one_or_none()

    def create(self, obj_in: TopicCreate) -> Topic:
        db_obj = Topic(
            name=obj_in.name,
            is_predefined=obj_in.is_predefined
        )
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def update(self, db_obj: Topic, obj_in: TopicUpdate) -> Topic:
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
