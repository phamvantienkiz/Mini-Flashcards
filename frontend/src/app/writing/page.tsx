"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCcw, X, Check, ArrowRight } from "lucide-react";
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
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-stone-500 font-sans">Preparing writing practice...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif mb-4">Not enough cards</h2>
        <p className="text-stone-500 mb-8 max-w-xs">
          You need at least 1 flashcard to start writing practice.
        </p>
        <Link
          href="/create"
          className="bg-primary text-white px-8 py-3 rounded-2xl font-medium"
        >
          Add More Cards
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">✍️</div>
          <h2 className="text-4xl font-serif mb-2">Practice Complete!</h2>
          <p className="text-stone-500">
            You spelled <span className="text-stone-900 font-bold">{score}</span> out of{" "}
            <span className="text-stone-900 font-bold">{questions.length}</span> words correctly.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={fetchWriting}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-surface border border-border py-4 rounded-2xl font-medium text-stone-600 flex items-center justify-center gap-2"
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
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-12 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden mb-12">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-12">
        <span className="text-stone-400 text-xs font-medium uppercase tracking-widest">
          Practice {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={() => router.push("/")}
          className="text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="text-center mb-16">
          <span className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4 block">
            Translate to English
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-medium text-stone-700">
            {currentQuestion.meaning}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="Type English word..."
              className={cn(
                "w-full bg-transparent border-b-4 py-4 text-4xl md:text-5xl font-serif text-center transition-colors focus:outline-none",
                !isSubmitted && "border-stone-200 focus:border-primary",
                isSubmitted && isCorrect && "border-emerald-500 text-emerald-600",
                isSubmitted && !isCorrect && "border-rose-500 text-rose-600"
              )}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isSubmitted}
            />
            
            <AnimatePresence>
              {isSubmitted && !isCorrect && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-emerald-600 font-sans mt-4 font-medium"
                >
                  Correct spelling: <span className="underline decoration-2">{currentQuestion.word}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {!isSubmitted ? (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="w-full bg-stone-900 text-white py-4 rounded-2xl font-medium shadow-lg hover:bg-stone-800 transition-all disabled:opacity-30"
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={nextQuestion}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              {currentIndex + 1 === questions.length ? "View Results" : "Next Word"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

// Reuse Home icon from Lucide
function Home(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
