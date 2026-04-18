import { apiClient } from "@/lib/api-client";
import { Stats } from "@/types";

export const statsService = {
  getStats: () => apiClient<Stats>("/flashcards/stats"),
};
