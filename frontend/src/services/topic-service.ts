import { apiClient } from "@/lib/api-client";
import { Topic, TopicCreate } from "@/types";

export const topicService = {
  getAll: (offset = 0, limit = 100) => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });
    return apiClient<Topic[]>(`/topics?${params.toString()}`);
  },

  getById: (id: string) => apiClient<Topic>(`/topics/${id}`),

  create: (data: TopicCreate) =>
    apiClient<Topic>("/topics", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
