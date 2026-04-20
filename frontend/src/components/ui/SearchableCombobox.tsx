"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Plus, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Topic } from "@/types";
import { topicService } from "@/services/topic-service";

interface SearchableComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchableCombobox({
  value,
  onChange,
  placeholder = "Select a topic...",
}: SearchableComboboxProps) {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTopic = topics.find((t) => t.id === value);

  const handleCreateTopic = async () => {
    if (!search || creating) return;
    setCreating(true);
    try {
      const newTopic = await topicService.create({ name: search });
      setTopics((prev) => [newTopic, ...prev]);
      onChange(newTopic.id);
      setOpen(false);
      setSearch("");
    } catch (error) {
      console.error("Failed to create topic:", error);
      alert("Failed to create topic.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent border-b border-foreground/10 py-4 text-[17px] font-medium focus:outline-none focus:border-primary transition-colors text-left"
      >
        <span className={cn(value ? "text-foreground" : "text-foreground/40")}>
          {selectedTopic ? selectedTopic.name : placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-apple apple-shadow z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
          <div className="flex items-center border-b border-black/5 px-4 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-foreground/40"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-1">
            {loading && (
              <div className="py-6 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            {!loading && filteredTopics.length === 0 && search && (
              <button
                type="button"
                onClick={handleCreateTopic}
                disabled={creating}
                className="w-full flex items-center gap-2 px-3 py-3 text-sm text-primary hover:bg-black/5 rounded-apple transition-colors font-medium"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Create topic "{search}"
              </button>
            )}
            {!loading && filteredTopics.length === 0 && !search && (
              <p className="py-6 text-center text-sm text-foreground/40">No topics found.</p>
            )}
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  onChange(topic.id);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-3 text-sm hover:bg-black/5 rounded-apple transition-colors text-left",
                  value === topic.id ? "bg-black/5 font-semibold" : "font-normal"
                )}
              >
                {topic.name}
                {value === topic.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
