"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { flashcardService } from "@/services/flashcard-service";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SearchableCombobox } from "@/components/ui/SearchableCombobox";

export default function CreateFlashcard() {
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [topicId, setTopicId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!english || !vietnamese || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await flashcardService.create({
        english,
        vietnamese,
        example_sentence: exampleSentence || null,
        topic_id: topicId || null,
      });
      setShowSuccess(true);
      setEnglish("");
      setVietnamese("");
      setExampleSentence("");
      setTopicId("");
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
    <main className="flex-1 w-full">
      {/* Header - Dark */}
      <section className="bg-black text-white pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[12px] font-semibold uppercase tracking-tight">
              Collection
            </span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tighter">
            Add Flashcard
          </h1>
          <p className="text-white/60 text-[21px] font-normal tracking-tight">
            Build your vocabulary one word at a time.
          </p>
        </div>
      </section>

      {/* Form Area - Light Gray */}
      <section className="bg-apple-gray py-20 px-6 min-h-[50vh]">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-16" onKeyDown={handleKeyDown}>
            {/* Topic Selection */}
            <div className="space-y-4">
              <label
                className="text-foreground/40 text-[12px] font-semibold uppercase tracking-tight"
              >
                Topic
              </label>
              <SearchableCombobox 
                value={topicId} 
                onChange={setTopicId} 
                placeholder="Choose a topic (optional)..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-4">
                <label
                  htmlFor="english"
                  className="text-foreground/40 text-[12px] font-semibold uppercase tracking-tight"
                >
                  English Word
                </label>
                <input
                  id="english"
                  type="text"
                  placeholder="e.g. Ephemeral"
                  autoFocus
                  className="w-full bg-transparent border-b border-foreground/10 py-4 text-3xl font-semibold focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10 tracking-tighter"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="vietnamese"
                  className="text-foreground/40 text-[12px] font-semibold uppercase tracking-tight"
                >
                  Vietnamese Meaning
                </label>
                <input
                  id="vietnamese"
                  type="text"
                  placeholder="e.g. Phù du"
                  className="w-full bg-transparent border-b border-foreground/10 py-4 text-3xl font-semibold focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10 tracking-tight"
                  value={vietnamese}
                  onChange={(e) => setVietnamese(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="example"
                className="text-foreground/40 text-[12px] font-semibold uppercase tracking-tight"
              >
                Example Sentence (Optional)
              </label>
              <textarea
                id="example"
                placeholder="How is this word used in a sentence?"
                rows={2}
                className="w-full bg-transparent border-b border-foreground/10 py-4 text-[21px] font-normal focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10 tracking-tight resize-none"
                value={exampleSentence}
                onChange={(e) => setExampleSentence(e.target.value)}
              />
            </div>

            <div className="pt-10 flex flex-col gap-6">
              <button
                type="submit"
                disabled={!english || !vietnamese || isSubmitting}
                className="apple-button-primary w-full py-4 text-[17px] font-semibold disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-2"
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
              <p className="text-center text-[12px] text-foreground/40">
                Press <kbd className="font-sans px-1.5 py-0.5 bg-black/5 rounded">⌘ + Enter</kbd> to save quickly.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white border border-black/5 px-6 py-4 rounded-apple flex items-center gap-4 apple-shadow"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-foreground">Saved!</p>
              <p className="text-[14px] text-foreground/60">Card added to your collection.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
