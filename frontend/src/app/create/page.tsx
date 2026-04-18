"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { flashcardService } from "@/services/flashcard-service";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateFlashcard() {
  const router = useRouter();
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!english || !vietnamese || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await flashcardService.create({ english, vietnamese });
      setShowSuccess(true);
      setEnglish("");
      setVietnamese("");
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to create flashcard:", error);
      alert("Error creating flashcard. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium uppercase tracking-widest">
          Back to Collection
        </span>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          Add Flashcard
        </h1>
        <p className="text-stone-500 font-sans">
          Build your vocabulary one word at a time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12" onKeyDown={handleKeyDown}>
        <div className="space-y-2">
          <label
            htmlFor="english"
            className="text-stone-400 text-xs font-medium uppercase tracking-widest"
          >
            English Word
          </label>
          <input
            id="english"
            type="text"
            placeholder="e.g. Ephemeral"
            autoFocus
            className="w-full bg-transparent border-b-2 border-stone-200 py-4 text-3xl md:text-4xl font-serif focus:outline-none focus:border-primary transition-colors placeholder:text-stone-200"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="vietnamese"
            className="text-stone-400 text-xs font-medium uppercase tracking-widest"
          >
            Vietnamese Meaning
          </label>
          <input
            id="vietnamese"
            type="text"
            placeholder="e.g. Phù du, chóng tàn"
            className="w-full bg-transparent border-b-2 border-stone-200 py-4 text-xl md:text-2xl font-sans focus:outline-none focus:border-primary transition-colors placeholder:text-stone-200"
            value={vietnamese}
            onChange={(e) => setVietnamese(e.target.value)}
            required
          />
        </div>

        <div className="pt-6 flex flex-col gap-4">
          <button
            type="submit"
            disabled={!english || !vietnamese || isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-2xl font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Flashcard"
            )}
          </button>
          <p className="text-center text-xs text-stone-400">
            Press <kbd className="font-sans px-1 bg-stone-100 rounded">⌘ + Enter</kbd> to save quickly.
          </p>
        </div>
      </form>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[60] glass border-emerald-500/20 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Saved!</p>
              <p className="text-xs text-stone-500">Card added to your collection.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
