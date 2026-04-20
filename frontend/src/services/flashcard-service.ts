import { apiClient } from "@/lib/api-client";
import { Flashcard, FlashcardCreate, FlashcardUpdate, PaginatedResponse } from "@/types";

export const flashcardService = {
  getAll: (q?: string, offset = 0, limit = 20, topicId?: string) => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });
    if (q) params.append("q", q);
    if (topicId) params.append("topic_id", topicId);
    return apiClient<PaginatedResponse<Flashcard>>(`/flashcards?${params.toString()}`);
  },

  getById: (id: string) => apiClient<Flashcard>(`/flashcards/${id}`),

  create: (data: FlashcardCreate) =>
    apiClient<Flashcard>("/flashcards", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: FlashcardUpdate) =>
    apiClient<Flashcard>(`/flashcards/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<void>(`/flashcards/${id}`, {
      method: "DELETE",
    }),
};
