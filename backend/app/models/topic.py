import uuid
from sqlalchemy import String, DateTime, func, Uuid, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from .flashcard import Flashcard

class Topic(Base):
    __tablename__ = "topics"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    is_predefined: Mapped[bool] = mapped_column(Boolean, default=False)
    
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now()
    )

    flashcards: Mapped[List["Flashcard"]] = relationship("Flashcard", back_populates="topic")
