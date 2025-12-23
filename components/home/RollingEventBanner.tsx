'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Event } from '@/types/store';

interface RollingEventBannerProps {
  events: Event[];
}

const GRADIENT_COLORS = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-red-500',
];

export default function RollingEventBanner({ events }: RollingEventBannerProps) {
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
  const gradientColor = GRADIENT_COLORS[currentIndex % GRADIENT_COLORS.length];

  return (
    <div className="relative overflow-hidden rounded-xl">
      <Link
        href={currentEvent.link}
        className={`block w-full bg-gradient-to-r ${gradientColor} transition-all duration-500`}
      >
        <div className="relative h-20 flex items-center justify-between px-4">
          <p className="text-white text-base font-bold flex-1">{currentEvent.title}</p>
          {events.length > 1 && (
            <div className="flex items-center gap-1 ml-3">
              <span className="text-white/80 text-xs font-medium">
                {currentIndex + 1}/{events.length}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Indicator dots */}
      {events.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`이벤트 ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
