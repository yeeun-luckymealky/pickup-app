'use client';

import { useRouter } from 'next/navigation';
import { Search, Heart, User } from 'lucide-react';
import Image from 'next/image';

export default function SearchBar() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleFavoriteClick = () => {
    // TODO: 찜 목록 페이지로 이동
  };

  const handleProfileClick = () => {
    router.push('/mypage');
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* 검색창 */}
      <button
        onClick={handleSearchClick}
        className="flex-1 relative"
      >
        <div className="flex items-center w-full h-12 px-4 border-2 border-green-500 rounded-lg bg-white">
          <span className="flex-1 text-left text-[15px] text-gray-500 truncate">
            망원소금빵, 오늘부터 알고리즘 등장하기로 함
          </span>
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
        </div>
      </button>

      {/* 찜 버튼 */}
      <button
        onClick={handleFavoriteClick}
        className="flex-shrink-0 p-1"
        aria-label="찜 목록"
      >
        <Heart className="w-6 h-6 fill-blue-500 text-blue-500" />
      </button>

      {/* 프로필 */}
      <button
        onClick={handleProfileClick}
        className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 bg-gradient-to-br from-teal-400 to-teal-600"
        aria-label="마이페이지"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-400 absolute bottom-0 right-0" />
        </div>
      </button>
    </div>
  );
}
