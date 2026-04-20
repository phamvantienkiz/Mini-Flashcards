from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.topic_repo import TopicRepository
from app.schemas.topic import Topic, TopicCreate, TopicUpdate
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Topic])
def read_topics(
    offset: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    repo = TopicRepository(db)
    return repo.get_all(offset=offset, limit=limit)

@router.post("/", response_model=Topic)
def create_topic(
    topic_in: TopicCreate,
    db: Session = Depends(get_db)
):
    repo = TopicRepository(db)
    existing = repo.get_by_name(topic_in.name)
    if existing:
        raise HTTPException(status_code=400, detail="Topic already exists")
    return repo.create(topic_in)

@router.get("/{topic_id}", response_model=Topic)
def read_topic(
    topic_id: str,
    db: Session = Depends(get_db)
):
    repo = TopicRepository(db)
    topic = repo.get_by_id(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic
