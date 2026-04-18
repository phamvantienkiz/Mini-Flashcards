"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCcw, X, Check, ArrowRight } from "lucide-react";
import { learningService } from "@/services/learning-service";
import { QuizQuestion } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const data = await learningService.getQuiz();
      setQuestions(data);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setScore(0);
      setIsFinished(false);
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    const correct = option === questions[currentIndex].correct_answer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-stone-500 font-sans">Preparing your quiz...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif mb-4">Not enough cards</h2>
        <p className="text-stone-500 mb-8 max-w-xs">
          You need at least 4 flashcards to start a multiple-choice quiz.
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
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-serif mb-2">Quiz Complete!</h2>
          <p className="text-stone-500">
            You got <span className="text-stone-900 font-bold">{score}</span> out of{" "}
            <span className="text-stone-900 font-bold">{questions.length}</span> correct.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={fetchQuiz}
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
          Question {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={() => router.push("/")}
          className="text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-center mb-16">
          <span className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4 block">
            Select the correct meaning
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            {currentQuestion.word}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === currentQuestion.correct_answer;
            
            let stateClass = "border-border hover:border-stone-400";
            if (selectedAnswer !== null) {
              if (isCorrectOption) stateClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
              else if (isSelected) stateClass = "border-rose-500 bg-rose-50 text-rose-900";
              else stateClass = "border-border opacity-50";
            }

            return (
              <button
                key={option}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(option)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 font-sans text-lg flex items-center justify-between group",
                  stateClass
                )}
              >
                <span>{option}</span>
                {selectedAnswer !== null && isCorrectOption && (
                  <Check className="w-5 h-5 text-emerald-500" />
                )}
                {selectedAnswer !== null && isSelected && !isCorrectOption && (
                  <X className="w-5 h-5 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-32 flex items-center justify-center">
        <AnimatePresence>
          {selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={nextQuestion}
              className="bg-stone-900 text-white px-12 py-4 rounded-2xl font-medium flex items-center gap-2 hover:bg-stone-800 transition-colors"
            >
              {currentIndex + 1 === questions.length ? "View Results" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
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
