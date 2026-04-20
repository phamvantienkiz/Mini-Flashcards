import uuid
from sqlalchemy import String, DateTime, func, Uuid, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .topic import Topic

class Flashcard(Base):
    __tablename__ = "flashcards"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4
    )
    english: Mapped[str] = mapped_column(String, index=True, nullable=False)
    vietnamese: Mapped[str] = mapped_column(String, nullable=False)
    example_sentence: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    topic_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        Uuid(as_uuid=True), 
        ForeignKey("topics.id"), 
        nullable=True,
        index=True
    )
    
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now()
    )

    topic: Mapped[Optional["Topic"]] = relationship("Topic", back_populates="flashcards")
