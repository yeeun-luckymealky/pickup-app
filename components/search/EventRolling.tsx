'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import type { Event } from '@/types/store';

interface EventRollingProps {
  events: Event[];
}

export default function EventRolling({ events }: EventRollingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  return (
    <Link
      href={currentEvent.link}
      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100"
    >
      <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-purple-700 font-medium truncate animate-pulse">
          {currentEvent.title}
        </p>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        {events.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-purple-500' : 'bg-purple-200'
            }`}
          />
        ))}
      </div>
    </Link>
  );
}
