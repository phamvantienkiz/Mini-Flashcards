"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface FlashcardProps {
  id?: string;
  english: string;
  vietnamese: string;
  className?: string;
  onDelete?: (id: string) => void;
}

export function Flashcard({ id, english, vietnamese, className, onDelete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && onDelete) {
      if (window.confirm("Are you sure you want to delete this flashcard?")) {
        onDelete(id);
      }
    }
  };

  return (
    <div
      className={cn(
        "perspective-1000 w-full max-w-sm aspect-[3/4] cursor-pointer group",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-apple bg-surface apple-shadow flex flex-col items-center justify-center p-8 text-center border-none">
          {onDelete && id && (
            <button
              onClick={handleDelete}
              className="absolute top-4 right-4 p-2 text-foreground/10 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <span className="text-[12px] font-semibold uppercase tracking-tight text-foreground/40 mb-6">
            English
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tighter leading-tight">
            {english}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-apple bg-surface apple-shadow flex flex-col items-center justify-center p-8 text-center border-none"
          style={{ transform: "rotateY(180deg)" }}
        >
          {onDelete && id && (
            <button
              onClick={handleDelete}
              className="absolute top-4 left-4 p-2 text-foreground/10 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
              style={{ transform: "rotateY(180deg)" }}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <span className="text-[12px] font-semibold uppercase tracking-tight text-foreground/40 mb-6">
            Vietnamese
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tighter leading-tight">
            {vietnamese}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
