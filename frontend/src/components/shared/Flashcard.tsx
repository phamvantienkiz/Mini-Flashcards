"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface FlashcardProps {
  id?: string;
  english: string;
  vietnamese: string;
  example_sentence?: string | null;
  topic?: { name: string } | null;
  className?: string;
  onDelete?: (id: string) => void;
}

export function Flashcard({
  id,
  english,
  vietnamese,
  example_sentence,
  topic,
  className,
  onDelete,
}: FlashcardProps) {
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
          <div className="flex flex-col items-center">
            {topic && (
              <span className="mb-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                {topic.name}
              </span>
            )}
            <span className="text-[12px] font-semibold uppercase tracking-tight text-foreground/40 mb-6">
              English
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tighter leading-tight">
            {english}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-apple bg-surface apple-shadow flex flex-col items-center justify-center p-8 text-center border-none overflow-hidden"
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
          <div className="w-full flex flex-col items-center">
            <span className="text-[12px] font-semibold uppercase tracking-tight text-foreground/40 mb-6">
              Vietnamese
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tighter leading-tight">
              {vietnamese}
            </h2>
            
            {example_sentence && (
              <div className="mt-8 pt-8 border-t border-foreground/5 w-full">
                <p className="text-[14px] text-foreground/60 italic leading-relaxed px-4">
                  "{example_sentence}"
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
