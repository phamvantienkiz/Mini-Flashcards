"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  english: string;
  vietnamese: string;
  className?: string;
}

export function Flashcard({ english, vietnamese, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "perspective-1000 w-full max-w-sm aspect-[3/4] cursor-pointer",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-surface border-2 border-border shadow-sm flex flex-col items-center justify-center p-6 text-center">
          <span className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4">
            English
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
            {english}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-surface border-2 border-border shadow-sm flex flex-col items-center justify-center p-6 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4">
            Vietnamese
          </span>
          <h2 className="text-2xl md:text-3xl font-sans text-stone-600 font-medium">
            {vietnamese}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
