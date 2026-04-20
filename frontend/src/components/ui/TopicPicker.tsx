"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Topic } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface TopicPickerProps {
  topics: Topic[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function TopicPicker({ topics, value, onChange, label = "Select Topic" }: TopicPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedTopic = topics.find((t) => t.id === value);
  const filteredTopics = topics.filter((t) => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      <label className="text-[12px] font-semibold uppercase tracking-tight text-foreground/40 ml-1 mb-2 block">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-5 py-4 bg-apple-gray rounded-[16px] flex items-center justify-between transition-all duration-300 border border-transparent",
          isOpen ? "ring-2 ring-primary bg-white apple-shadow" : "hover:bg-black/5"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[17px] font-medium tracking-tight">
            {selectedTopic ? selectedTopic.name : "All Topics"}
          </span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-foreground/20 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-[24px] apple-shadow z-50 overflow-hidden origin-top"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-black/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Filter topics..."
                  className="w-full pl-10 pr-4 py-2 bg-black/5 rounded-full text-[14px] focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-[280px] overflow-y-auto py-2 px-2 scrollbar-hide">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-[12px] transition-colors mb-1",
                  value === "" ? "bg-primary text-white" : "hover:bg-black/5"
                )}
              >
                <span className="text-[15px] font-medium">All Topics</span>
                {value === "" && <Check className="w-4 h-4" />}
              </button>

              {filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    onChange(topic.id);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-[12px] transition-colors mb-1",
                    value === topic.id ? "bg-primary text-white" : "hover:bg-black/5"
                  )}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-medium">{topic.name}</span>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold mt-0.5",
                      value === topic.id ? "text-white/60" : "text-foreground/30"
                    )}>
                      {topic.is_predefined ? "Standard" : "Personal"}
                    </span>
                  </div>
                  {value === topic.id && <Check className="w-4 h-4" />}
                </button>
              ))}

              {filteredTopics.length === 0 && (
                <div className="py-8 text-center text-foreground/40 text-[14px]">
                  No topics matching "{search}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
