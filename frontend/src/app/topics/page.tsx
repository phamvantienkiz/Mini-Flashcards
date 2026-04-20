"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Bookmark } from "lucide-react";
import { topicService } from "@/services/topic-service";
import { Topic } from "@/types";
import { motion } from "framer-motion";

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  const fetchTopics = async () => {
    try {
      const data = await topicService.getAll();
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName || isCreating) return;

    setIsCreating(true);
    try {
      const newTopic = await topicService.create({ name: newTopicName });
      setTopics((prev) => [newTopic, ...prev]);
      setNewTopicName("");
    } catch (error) {
      console.error("Failed to create topic:", error);
      alert("Failed to create topic.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="flex-1 w-full min-h-screen bg-apple-gray">
      {/* Header - Dark */}
      <section className="bg-black text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tighter">
            Topics
          </h1>
          <p className="text-white/60 text-[21px] font-normal tracking-tight max-w-2xl">
            Organize your vocabulary by category. Master specific themes at your own pace.
          </p>
          
          <form onSubmit={handleCreateTopic} className="mt-12 flex gap-4 max-w-md">
            <input
              type="text"
              placeholder="Enter new topic name..."
              className="flex-1 px-6 py-3 bg-white/10 border border-white/10 rounded-[11px] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newTopicName || isCreating}
              className="bg-white text-black px-6 py-3 rounded-[11px] font-semibold hover:bg-white/90 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 flex items-center gap-2"
            >
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create
            </button>
          </form>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-foreground/60 animate-pulse">Loading topics...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-8 rounded-[20px] apple-shadow group hover:scale-[1.02] transition-transform cursor-default border-none"
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-12 h-12 bg-apple-gray rounded-[12px] flex items-center justify-center text-primary">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    {topic.is_predefined && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                        System
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {topic.name}
                  </h3>
                  <p className="mt-2 text-foreground/40 text-[14px]">
                    {topic.is_predefined ? "Predefined collection" : "Your personal topic"}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
