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

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-12">
      {/* Header & Stats */}
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
            My Collection
          </h1>
          <p className="text-stone-500 font-sans">
            You have mastered{" "}
            <span className="text-stone-900 font-semibold">
              {stats?.total_count || 0}
            </span>{" "}
            words so far.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search words..."
            className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Word Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-stone-500 animate-pulse">Loading collection...</p>
        </div>
      ) : flashcards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flashcards.map((card) => (
            <FlashcardComponent
              key={card.id}
              english={card.english}
              vietnamese={card.vietnamese}
              className="mx-auto"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-dashed border-stone-200 rounded-3xl">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
            <PlusCircle className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-xl font-serif text-foreground mb-2">
            No flashcards found
          </h3>
          <p className="text-stone-500 max-w-xs mb-8">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : "Your collection is empty. Start adding some words to begin your journey."}
          </p>
          {!searchQuery && (
            <Link
              href="/create"
              className="bg-primary text-white px-8 py-3 rounded-2xl font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Add First Card
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
