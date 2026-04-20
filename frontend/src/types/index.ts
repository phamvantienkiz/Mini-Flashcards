export interface Topic {
  id: string;
  name: string;
  is_predefined: boolean;
  created_at: string;
  updated_at: string;
}

export interface TopicSimple {
  id: string;
  name: string;
}

export interface TopicCreate {
  name: string;
  is_predefined?: boolean;
}

export interface Flashcard {
  id: string;
  english: string;
  vietnamese: string;
  example_sentence: string | null;
  topic_id: string | null;
  topic?: TopicSimple | null;
  created_at: string;
  updated_at: string;
}

export interface FlashcardCreate {
  english: string;
  vietnamese: string;
  example_sentence?: string | null;
  topic_id?: string | null;
}

export interface FlashcardUpdate {
  english?: string;
  vietnamese?: string;
  example_sentence?: string | null;
  topic_id?: string | null;
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
