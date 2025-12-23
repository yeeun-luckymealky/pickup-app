'use client';

import Link from 'next/link';
import type { Event } from '@/types/store';

interface EventBannerProps {
  event: Event;
}

export default function EventBanner({ event }: EventBannerProps) {
  return (
    <Link
      href={event.link}
      className="block w-full rounded-xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors"
    >
      <div className="relative h-24 flex items-center justify-center px-4">
        <p className="text-white text-lg font-bold text-center">{event.title}</p>
      </div>
    </Link>
  );
}
