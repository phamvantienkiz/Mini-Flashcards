"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCcw, X, Check, ArrowRight, Home, Play, BookOpen } from "lucide-react";
import { learningService } from "@/services/learning-service";
import { topicService } from "@/services/topic-service";
import { QuizQuestion, Topic } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TopicPicker } from "@/components/ui/TopicPicker";

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState("");

  const fetchQuiz = useCallback(async (topicId?: string) => {
    setLoading(true);
    try {
      const data = await learningService.getQuiz(10, topicId);
      setQuestions(data);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setIsFinished(false);
      setIsStarted(true);
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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
    fetchTopics();
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    const correct = option === questions[currentIndex].correct_answer;
    setSelectedAnswer(option);
    if (correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  if (loading && !isStarted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-apple-gray">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-foreground/40 text-[17px] font-normal tracking-tight animate-pulse">Preparing...</p>
      </div>
    );
  }

  // Pre-session Screen
  if (!isStarted) {
    return (
      <main className="flex-1 w-full bg-apple-gray flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[32px] apple-shadow p-10 text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-semibold mb-4 tracking-tighter">Quiz Session</h1>
          <p className="text-foreground/60 text-[17px] mb-10 leading-relaxed">
            Choose a topic you'd like to focus on or challenge yourself with everything.
          </p>

          <div className="mb-12">
            <TopicPicker
              topics={topics}
              value={selectedTopicId}
              onChange={setSelectedTopicId}
            />
          </div>

          <button
            onClick={() => fetchQuiz(selectedTopicId)}
            className="apple-button-primary w-full py-4 text-[17px] font-semibold flex items-center justify-center gap-3 scale-110"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Session
          </button>
        </motion.div>
      </main>
    );
  }

  if (loading && isStarted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-apple-gray">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-foreground/40 text-[17px] font-normal tracking-tight animate-pulse">Preparing your quiz...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-apple-gray">
        <h2 className="text-3xl font-semibold mb-6 tracking-tighter">No cards found</h2>
        <p className="text-foreground/60 mb-10 max-w-xs text-[17px] leading-relaxed">
          There are not enough flashcards in this topic to start a quiz.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <button
            onClick={() => setIsStarted(false)}
            className="apple-button-primary py-4 text-[17px] font-semibold"
          >
            Change Topic
          </button>
          <Link
            href="/create"
            className="bg-white border border-black/5 py-4 rounded-apple font-semibold text-foreground apple-shadow"
          >
            Add More Cards
          </Link>
        </div>
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
          <div className="text-7xl mb-6">🎉</div>
          <h2 className="text-5xl font-semibold mb-4 tracking-tighter">Quiz Complete!</h2>
          <p className="text-foreground/60 text-[21px] tracking-tight">
            You got <span className="text-foreground font-semibold">{score}</span> out of{" "}
            <span className="text-foreground font-semibold">{questions.length}</span> correct.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={() => setIsStarted(false)}
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
      <section className="bg-black text-white pt-12 pb-8 md:pt-16 md:pb-10 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar - Apple Blue */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8 md:mb-10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between mb-6 md:mb-8">
            <span className="text-white/40 text-[12px] font-semibold uppercase tracking-tight">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button
              onClick={() => setIsStarted(false)}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center py-4 md:py-6">
            <span className="text-white/40 text-[12px] font-semibold uppercase tracking-tight mb-2 md:mb-4 block">
              Select the correct meaning
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">
              {currentQuestion.word}
            </h2>
          </div>
        </div>
      </section>

      {/* Options Area - Light Gray */}
      <section className="flex-1 py-8 md:py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correct_answer;
              
              let stateClass = "bg-white border-transparent apple-shadow hover:scale-[1.01]";
              if (selectedAnswer !== null) {
                if (isCorrectOption) stateClass = "bg-emerald-500 text-white apple-shadow scale-[1.02] z-10";
                else if (isSelected) stateClass = "bg-rose-500 text-white apple-shadow scale-[0.98]";
                else stateClass = "bg-white/50 border-transparent opacity-40 grayscale-[0.5]";
              }

              return (
                <button
                  key={option}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(option)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 md:p-6 rounded-apple border transition-all duration-300 flex items-center justify-between group",
                    stateClass
                  )}
                >
                  <span className="text-[17px] md:text-[19px] font-medium tracking-tight">{option}</span>
                  <AnimatePresence>
                    {selectedAnswer !== null && isCorrectOption && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    )}
                    {selectedAnswer !== null && isSelected && !isCorrectOption && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="h-24 md:h-32 flex items-center justify-center">
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={nextQuestion}
                  className="apple-button-primary px-10 md:px-12 py-3 md:py-4 text-[15px] md:text-[17px] font-semibold flex items-center gap-3"
                >
                  {currentIndex + 1 === questions.length ? "View Results" : "Next Question"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
