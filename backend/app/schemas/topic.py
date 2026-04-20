from typing import Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# Topic Schemas
class TopicBase(BaseModel):
    name: str
    is_predefined: bool = False

class TopicCreate(TopicBase):
    pass

class TopicUpdate(BaseModel):
    name: Optional[str] = None
    is_predefined: Optional[bool] = None

class Topic(TopicBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class TopicSimple(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)
