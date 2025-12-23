'use client';

import Link from 'next/link';
import { Map } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export default function MapViewButton() {
  const { isModalOpen } = useUIStore();

  // 모달이 열려있으면 숨김
  if (isModalOpen) {
    return null;
  }

  return (
    <Link
      href="/search"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 active:bg-gray-700 transition-colors"
    >
      <Map className="w-5 h-5" />
      <span className="font-medium">지도 보기</span>
    </Link>
  );
}
