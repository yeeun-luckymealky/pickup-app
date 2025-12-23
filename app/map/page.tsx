'use client';

import { useState } from 'react';
import { ArrowLeft, List, Search } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import SearchInputView from '@/components/search/SearchInputView';

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">지도 보기</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <List className="w-4 h-4" />
            <span>목록</span>
          </Link>
        </div>

        {/* 검색창 */}
        <div className="px-4 pb-3">
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-3 w-full h-10 px-4 bg-gray-100 rounded-lg text-sm text-gray-400 hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>지역, 가게명, 메뉴 검색</span>
          </button>
        </div>

        {/* 카테고리 필터 */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 relative z-0 bg-gray-100">
        {/* Placeholder for map */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-500">지도 기능은 준비 중입니다</p>
            <p className="text-sm text-gray-400 mt-1">곧 만나보실 수 있어요!</p>
          </div>
        </div>
      </div>

      {/* 검색 모달 */}
      {showSearch && <SearchInputView onClose={() => setShowSearch(false)} />}
    </div>
  );
}
