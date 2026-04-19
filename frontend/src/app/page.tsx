"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, PlusCircle } from "lucide-react";
import { Flashcard as FlashcardComponent } from "@/components/shared/Flashcard";
import { flashcardService } from "@/services/flashcard-service";
import { statsService } from "@/services/stats-service";
import { Flashcard, Stats } from "@/types";
import Link from "next/link";

export default function Dashboard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flashcardsRes, statsRes] = await Promise.all([
          flashcardService.getAll(searchQuery),
          statsService.getStats(),
        ]);
        setFlashcards(flashcardsRes.data);
        setStats(statsRes);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, searchQuery ? 300 : 0);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await flashcardService.delete(id);
      setFlashcards((prev) => prev.filter((card) => card.id !== id));
      if (stats) {
        setStats({ ...stats, total_count: stats.total_count - 1 });
      }
    } catch (error) {
      console.error("Failed to delete flashcard:", error);
      alert("Failed to delete flashcard. Please try again.");
    }
  };

  return (
    <main className="flex-1 w-full">
      {/* Hero Section - Dark */}
      <section className="bg-black text-white pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tighter">
              My Collection
            </h1>
            <p className="text-white/60 text-[21px] font-normal tracking-tight">
              You have mastered{" "}
              <span className="text-white font-semibold">
                {stats?.total_count || 0}
              </span>{" "}
              words so far.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 transition-colors group-focus-within:text-white" />
            <input
              type="text"
              placeholder="Search words..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-[11px] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Word Grid - Light Gray */}
      <section className="bg-apple-gray py-20 px-6 min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-foreground/60 animate-pulse">Loading collection...</p>
            </div>
          ) : flashcards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {flashcards.map((card) => (
                <FlashcardComponent
                  key={card.id}
                  id={card.id}
                  english={card.english}
                  vietnamese={card.vietnamese}
                  onDelete={handleDelete}
                  className="mx-auto"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-8">
                <PlusCircle className="w-10 h-10 text-foreground/20" />
              </div>
              <h3 className="text-3xl font-semibold text-foreground mb-4 tracking-tighter">
                No flashcards found
              </h3>
              <p className="text-[17px] text-foreground/60 max-w-sm mb-10 leading-relaxed">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "Your collection is empty. Start adding some words to begin your journey."}
              </p>
              {!searchQuery && (
                <Link
                  href="/create"
                  className="apple-button-primary scale-110"
                >
                  Add First Card
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
