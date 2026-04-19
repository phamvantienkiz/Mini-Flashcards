"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCcw, X, Check, ArrowRight, Home } from "lucide-react";
import { learningService } from "@/services/learning-service";
import { WritingPrompt } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function WritingPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<WritingPrompt[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchWriting();
  }, []);

  const fetchWriting = async () => {
    setLoading(true);
    try {
      const data = await learningService.getWriting();
      setQuestions(data);
      setCurrentIndex(0);
      setUserInput("");
      setIsSubmitted(false);
      setIsCorrect(null);
      setScore(0);
      setIsFinished(false);
    } catch (error) {
      console.error("Failed to fetch writing practice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isSubmitted || !userInput.trim()) return;

    const correct = userInput.trim().toLowerCase() === questions[currentIndex].word.toLowerCase();
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setIsSubmitted(false);
      setIsCorrect(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-apple-gray">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-foreground/40 text-[17px] font-normal tracking-tight animate-pulse">Preparing writing practice...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-apple-gray">
        <h2 className="text-3xl font-semibold mb-6 tracking-tighter">Not enough cards</h2>
        <p className="text-foreground/60 mb-10 max-w-xs text-[17px] leading-relaxed">
          You need at least 1 flashcard to start writing practice.
        </p>
        <Link
          href="/create"
          className="apple-button-primary scale-110"
        >
          Add More Cards
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-apple-gray">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-12"
        >
          <div className="text-7xl mb-6">✍️</div>
          <h2 className="text-5xl font-semibold mb-4 tracking-tighter">Practice Complete!</h2>
          <p className="text-foreground/60 text-[21px] tracking-tight">
            You spelled <span className="text-foreground font-semibold">{score}</span> out of{" "}
            <span className="text-foreground font-semibold">{questions.length}</span> words correctly.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={fetchWriting}
            className="flex-1 apple-button-primary py-4 text-[17px] font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-white border border-black/5 py-4 rounded-apple font-semibold text-foreground flex items-center justify-center gap-2 apple-shadow"
          >
            <Home className="w-4 h-4" />
            Collection
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <main className="flex-1 w-full flex flex-col bg-apple-gray">
      {/* Header Area - Dark */}
      <section className="bg-black text-white pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar - Apple Blue */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <span className="text-white/40 text-[12px] font-semibold uppercase tracking-tight">
              Practice {currentIndex + 1} of {questions.length}
            </span>
            <button
              onClick={() => router.push("/")}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center py-8">
            <span className="text-white/40 text-[12px] font-semibold uppercase tracking-tight mb-4 block">
              Translate to English
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
              {currentQuestion.meaning}
            </h2>
          </div>
        </div>
      </section>

      {/* Input Area - Light Gray */}
      <section className="flex-1 py-16 px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-12">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                autoFocus
                autoComplete="off"
                spellCheck="false"
                placeholder="Type English word..."
                className={cn(
                  "w-full bg-transparent border-b-2 py-6 text-4xl md:text-6xl font-semibold text-center transition-all focus:outline-none tracking-tighter",
                  !isSubmitted && "border-foreground/10 focus:border-primary",
                  isSubmitted && isCorrect && "border-emerald-500 text-emerald-600",
                  isSubmitted && !isCorrect && "border-rose-500 text-rose-600"
                )}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isSubmitted}
              />
              
              <AnimatePresence>
                {isSubmitted && !isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6"
                  >
                    <p className="text-foreground/40 text-[14px] uppercase font-semibold tracking-tight mb-1">Correct spelling</p>
                    <p className="text-emerald-600 text-[21px] font-semibold tracking-tight">{currentQuestion.word}</p>
                  </motion.div>
                )}
                {isSubmitted && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-6 text-emerald-600 font-semibold text-[21px]"
                  >
                    Perfect!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-8">
              {!isSubmitted ? (
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="w-full bg-black text-white py-4 rounded-apple text-[17px] font-semibold apple-shadow hover:bg-black/90 transition-all disabled:opacity-30"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="apple-button-primary w-full py-4 text-[17px] font-semibold flex items-center justify-center gap-3"
                >
                  {currentIndex + 1 === questions.length ? "View Results" : "Next Word"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
