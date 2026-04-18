import random
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.flashcard import Flashcard
from app.repositories.flashcard_repo import FlashcardRepository
from app.schemas.flashcard import QuizQuestion, WritingPrompt

class LearningService:
    def __init__(self, db: Session):
        self.repo = FlashcardRepository(db)
        self.db = db

    def get_quiz_questions(self, limit: int = 10) -> List[QuizQuestion]:
        target_cards = self.repo.get_random(limit=limit)
        questions = []

        for card in target_cards:
            # Get 3 distractors from other cards
            distractors_query = select(Flashcard.vietnamese).filter(
                Flashcard.id != card.id
            ).order_by(func.random()).limit(3)
            distractors = self.db.execute(distractors_query).scalars().all()
            
            options = list(distractors) + [card.vietnamese]
            random.shuffle(options)
            
            questions.append(QuizQuestion(
                flashcard_id=card.id,
                word=card.english,
                options=options,
                correct_answer=card.vietnamese
            ))
            
        return questions

    def get_writing_prompts(self, limit: int = 10) -> List[WritingPrompt]:
        cards = self.repo.get_random(limit=limit)
        return [
            WritingPrompt(
                flashcard_id=card.id,
                meaning=card.vietnamese,
                word=card.english
            ) for card in cards
        ]
