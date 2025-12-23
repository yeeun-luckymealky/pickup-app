'use client';

import { useState } from 'react';
import { Search, Bell, Bookmark, MapPin, Navigation, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Featured campaign data
const featuredCampaign = {
  title: '연말 럭키밀 특별전',
  items: [
    {
      id: 1,
      image: '/images/featured-1.jpg',
      title: '성심당 × 럭키밀',
      subtitle: '대전의 전설을 만나보세요',
      description: '단독 할인 진행중',
      bgColor: 'bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900',
    },
    {
      id: 2,
      image: '/images/featured-2.jpg',
      title: '크리스마스 럭키박스',
      subtitle: '2,000원 상당 디저트',
      description: '선착순 100명 한정',
      bgColor: 'bg-gradient-to-br from-red-900 via-red-800 to-rose-900',
    },
    {
      id: 3,
      image: '/images/featured-3.jpg',
      title: '연말 감사 이벤트',
      subtitle: '최대 70% 할인',
      description: '12월 한정 혜택',
      bgColor: 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900',
    },
  ],
};

// Theme/situation based picks
const themePicks = [
  {
    id: 1,
    title: '퇴근길\n간식 챙기기',
    hashtag: '#퇴근후럭키밀',
    bgColor: 'bg-gradient-to-br from-orange-600 to-amber-700',
    textColor: 'text-white',
  },
  {
    id: 2,
    title: '주말 브런치\n디저트',
    hashtag: '#주말디저트',
    bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600',
    textColor: 'text-white',
  },
  {
    id: 3,
    title: '오늘만\n이 가격',
    hashtag: '#오늘의특가',
    bgColor: 'bg-gradient-to-br from-violet-600 to-purple-700',
    textColor: 'text-white',
  },
  {
    id: 4,
    title: '새로 온\n가게',
    hashtag: '#신규입점',
    bgColor: 'bg-gradient-to-br from-cyan-600 to-blue-700',
    textColor: 'text-white',
  },
];

// Curated stores
const curatedStores = [
  {
    id: 1,
    name: '르뱅쿠키 강남점',
    category: '베이커리',
    discount: 40,
    originalPrice: 12000,
    timeLeft: '2시간 남음',
    distance: '500m',
    rating: 4.8,
    reviewCount: 234,
  },
  {
    id: 2,
    name: '아우어베이커리',
    category: '베이커리',
    discount: 35,
    originalPrice: 8500,
    timeLeft: '3시간 남음',
    distance: '1.2km',
    rating: 4.9,
    reviewCount: 512,
  },
  {
    id: 3,
    name: '도쿄팡야',
    category: '디저트',
    discount: 50,
    originalPrice: 6000,
    timeLeft: '1시간 남음',
    distance: '800m',
    rating: 4.7,
    reviewCount: 189,
  },
];

// Editor's picks
const editorPicks = [
  {
    id: 1,
    title: '빵지순례 필수 코스',
    subtitle: '서울 3대 빵집 럭키밀',
    storeCount: 12,
    bgColor: 'bg-stone-900',
  },
  {
    id: 2,
    title: '달콤한 연말',
    subtitle: '케이크 & 디저트 특집',
    storeCount: 24,
    bgColor: 'bg-rose-900',
  },
];

export default function ExplorePage() {
  const [currentFeatured, setCurrentFeatured] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white">
        {/* Search Row */}
        <div className="px-4 py-3 flex items-center gap-3">
          <Link
            href="/search"
            className="flex-1 flex items-center gap-2.5 px-4 py-2.5 bg-gray-100 rounded-full"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">어떤 가게를 찾으세요?</span>
          </Link>
          <button className="p-2">
            <Bookmark className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
          </button>
          <button className="p-2 relative">
            <Bell className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Location Row */}
        <div className="px-4 pb-3 flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4 text-gray-900" />
            <span className="font-medium">강남역</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Navigation className="w-3.5 h-3.5" />
            <span>현재 위치로</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-28">
        {/* Featured Campaign Section */}
        <section className="bg-stone-900 px-4 py-6">
          <h2 className="text-white text-lg font-bold mb-4">{featuredCampaign.title}</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {featuredCampaign.items.map((item, idx) => (
              <Link
                key={item.id}
                href={`/explore/campaign/${item.id}`}
                className="flex-shrink-0 w-64"
              >
                <div className={`relative h-72 rounded-2xl overflow-hidden ${item.bgColor}`}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm font-medium mb-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-white/60 text-xs">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Theme Picks */}
        <section className="py-6">
          <div className="px-4 mb-4">
            <h2 className="text-lg font-bold">상황별 · 주제별 BEST</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
            {themePicks.map((theme) => (
              <Link
                key={theme.id}
                href={`/explore/theme/${theme.id}`}
                className="flex-shrink-0"
              >
                <div className={`relative w-32 h-40 rounded-2xl overflow-hidden ${theme.bgColor}`}>
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <h3 className={`text-base font-bold leading-tight whitespace-pre-line ${theme.textColor}`}>
                      {theme.title}
                    </h3>
                    <span className={`text-xs opacity-80 ${theme.textColor}`}>
                      {theme.hashtag}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-2 bg-gray-100" />

        {/* Curated Stores */}
        <section className="py-6">
          <div className="px-4 flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">지금 주목할 가게</h2>
              <p className="text-sm text-gray-500 mt-0.5">마감 임박 순</p>
            </div>
            <Link href="/explore/stores" className="text-sm text-gray-400 flex items-center">
              더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="px-4 space-y-3">
            {curatedStores.map((store) => (
              <Link
                key={store.id}
                href={`/store/${store.id}`}
                className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                {/* Store Image Placeholder */}
                <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />

                {/* Store Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{store.category} · {store.distance}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                      {store.discount}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-600 font-bold">
                      {(store.originalPrice * (100 - store.discount) / 100).toLocaleString()}원
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {store.originalPrice.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-red-500 font-medium">{store.timeLeft}</span>
                    <span className="text-xs text-gray-400">★ {store.rating} ({store.reviewCount})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-2 bg-gray-100" />

        {/* Editor's Picks */}
        <section className="py-6 px-4">
          <h2 className="text-lg font-bold mb-4">에디터 추천 컬렉션</h2>
          <div className="space-y-3">
            {editorPicks.map((pick) => (
              <Link
                key={pick.id}
                href={`/explore/collection/${pick.id}`}
                className={`block relative h-28 rounded-2xl overflow-hidden ${pick.bgColor}`}
              >
                <div className="absolute inset-0 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-lg font-bold">{pick.title}</h3>
                    <p className="text-white/70 text-sm mt-0.5">{pick.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-1 text-white/60">
                    <span className="text-sm">{pick.storeCount}개 가게</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
