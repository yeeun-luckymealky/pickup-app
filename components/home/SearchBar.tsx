'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 relative"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <div className="w-full h-10 pl-9 pr-8 bg-gray-100 rounded-lg text-xs text-gray-400 flex items-center hover:bg-gray-200 transition-colors">
          🍀 강남구 럭키 맛집은?
        </div>
      </div>
    </button>
  );
}
