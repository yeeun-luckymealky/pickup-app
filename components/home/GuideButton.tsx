'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function GuideButton() {
  return (
    <Link
      href="/guide"
      className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">이용 가이드</p>
          <p className="text-xs text-gray-500">럭키밀 픽업 방법을 안내드려요</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </Link>
  );
}
