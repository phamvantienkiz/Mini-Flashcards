import { apiClient } from "@/lib/api-client";
import { QuizQuestion, WritingPrompt } from "@/types";

export const learningService = {
  getQuiz: (limit = 10, topicId?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (topicId) params.append("topic_id", topicId);
    return apiClient<QuizQuestion[]>(`/learning/quiz?${params.toString()}`);
  },

  getWriting: (limit = 10, topicId?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (topicId) params.append("topic_id", topicId);
    return apiClient<WritingPrompt[]>(`/learning/writing?${params.toString()}`);
  },
};
