export interface Flashcard {
  id: string;
  english: string;
  vietnamese: string;
  created_at: string;
  updated_at: string;
}

export interface FlashcardCreate {
  english: string;
  vietnamese: string;
}

export interface FlashcardUpdate {
  english?: string;
  vietnamese?: string;
}

export interface Pagination {
  total: number;
  offset: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface QuizQuestion {
  flashcard_id: string;
  word: string;
  options: string[];
  correct_answer: string;
}

export interface WritingPrompt {
  flashcard_id: string;
  meaning: string;
  word: string;
}

export interface Stats {
  total_count: number;
}
