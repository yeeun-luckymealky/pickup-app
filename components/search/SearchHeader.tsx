'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';

interface SearchHeaderProps {
  onSearchClick: () => void;
}

export default function SearchHeader({ onSearchClick }: SearchHeaderProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useFilterStore();

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div
            onClick={onSearchClick}
            className="flex-1 relative cursor-pointer"
          >
            <div className="w-full h-10 pl-4 pr-10 bg-gray-100 rounded-lg text-sm flex items-center">
              {searchQuery ? (
                <span className="text-gray-900 flex-1 truncate">{searchQuery}</span>
              ) : (
                <span className="text-gray-400">지역, 가게명, 메뉴 검색</span>
              )}
            </div>
            {searchQuery ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            ) : (
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
