import { apiClient } from "@/lib/api-client";
import { QuizQuestion, WritingPrompt } from "@/types";

export const learningService = {
  getQuiz: () => apiClient<QuizQuestion[]>("/learning/quiz"),
  getWriting: () => apiClient<WritingPrompt[]>("/learning/writing"),
};
