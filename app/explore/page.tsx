'use client';

import { useState } from 'react';
import { Search, Bell, Bookmark, MapPin, Navigation, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// 에디토리얼 프로모션 섹션
const editorialPromos = [
  {
    id: 1,
    title: '연말 럭키밀,\n특별한 디저트와 함께',
    description: '단독 할인부터 최대 50% 혜택까지,\n연말을 더 달콤하게 만들어줄 럭키밀을 만나보세요.',
    stores: [
      {
        id: 101,
        tag: '프로모션',
        name: '르뱅쿠키 성수점',
        location: '성수동 · 도보 10분',
        originalPrice: 15000,
        discountRate: 40,
        bgColor: 'bg-amber-900',
      },
      {
        id: 102,
        tag: '단독',
        name: '아우어베이커리',
        location: '한남동 · 도보 15분',
        originalPrice: 12000,
        discountRate: 35,
        bgColor: 'bg-stone-800',
      },
    ],
  },
  {
    id: 2,
    title: '퇴근길 간식,\n오늘도 럭키하게',
    description: '하루의 끝을 달콤하게.\n퇴근길에 픽업하기 좋은 가게들을 모았어요.',
    stores: [
      {
        id: 201,
        tag: '마감임박',
        name: '도쿄팡야 강남점',
        location: '강남역 · 도보 5분',
        originalPrice: 8000,
        discountRate: 50,
        bgColor: 'bg-zinc-800',
      },
      {
        id: 202,
        tag: '인기',
        name: '밀도 역삼점',
        location: '역삼동 · 도보 8분',
        originalPrice: 9500,
        discountRate: 30,
        bgColor: 'bg-emerald-900',
      },
    ],
  },
];

// 골목별 럭키코스
const locationPicks = [
  {
    id: 1,
    title: '문래동',
    subtitle: '철공소 골목의 숨은 맛집',
    storeCount: 8,
    bgColor: 'bg-gradient-to-br from-zinc-700 to-stone-800',
  },
  {
    id: 2,
    title: '성수동',
    subtitle: '힙한 카페 & 베이커리',
    storeCount: 12,
    bgColor: 'bg-gradient-to-br from-emerald-700 to-teal-800',
  },
  {
    id: 3,
    title: '자양동',
    subtitle: '로컬 맛집 탐방',
    storeCount: 6,
    bgColor: 'bg-gradient-to-br from-orange-600 to-amber-700',
  },
  {
    id: 4,
    title: '방배동',
    subtitle: '조용한 동네 디저트',
    storeCount: 5,
    bgColor: 'bg-gradient-to-br from-rose-600 to-pink-700',
  },
];

// 에디터 픽
const editorPicks = [
  {
    id: 1,
    tag: '에디터 픽',
    title: '에디터가 직접 모은,\n럭키밀 속 트리 맛집',
    stores: [
      { name: '연남동 화이트트리', item: '팡도르', discount: 40 },
      { name: '성수 빈티지트리', item: '슈톨렌', discount: 35 },
      { name: '한남 골드트리', item: '케이크', discount: 30 },
    ],
  },
];

// 먼저 준비할수록 섹션
const earlyBirdSection = {
  title: '먼저 준비할수록 가벼워지는',
  subtitle: '크리스마스 디저트',
  stores: [
    {
      id: 301,
      name: '나폴레옹과자점',
      location: '서울 마포구',
      originalPrice: 45000,
      discountRate: 25,
      tag: '예약필수',
    },
    {
      id: 302,
      name: '패스트리부티크',
      location: '서울 강남구',
      originalPrice: 38000,
      discountRate: 20,
      tag: '한정수량',
    },
  ],
};

export default function ExplorePage() {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link
            href="/search"
            className="flex-1 flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-full"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">어떤 가게를 찾으세요?</span>
          </Link>
          <button className="p-2">
            <Bell className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
          </button>
          <Link href="/mypage" className="p-2">
            <div className="w-5 h-5 rounded-full bg-gray-200" />
          </Link>
        </div>
      </header>

      <main className="flex-1 pb-28">
        {/* Editorial Promo Sections */}
        {editorialPromos.map((promo, index) => (
          <section key={promo.id} className={index > 0 ? 'mt-2 pt-6 border-t-8 border-gray-100' : ''}>
            {/* Section Header */}
            <Link href={`/explore/promo/${promo.id}`} className="block px-4 py-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold leading-tight whitespace-pre-line">
                    {promo.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 whitespace-pre-line leading-relaxed">
                    {promo.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              </div>
            </Link>

            {/* Store Cards - Horizontal Scroll */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-6">
              {promo.stores.map((store) => (
                <Link
                  key={store.id}
                  href={`/store/${store.id}`}
                  className="flex-shrink-0 w-72"
                >
                  {/* Card Image */}
                  <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${store.bgColor}`}>
                    {/* Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
                        {store.tag}
                      </span>
                    </div>
                    {/* Bookmark */}
                    <button
                      onClick={(e) => toggleBookmark(store.id, e)}
                      className="absolute top-3 right-3 p-1"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${bookmarked.includes(store.id) ? 'fill-white text-white' : 'text-white'}`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="mt-3">
                    <h3 className="font-semibold">{store.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{store.location}</p>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-sm text-gray-400 line-through">
                        ₩{store.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-green-500 font-bold">
                        {store.discountRate}%
                      </span>
                      <span className="text-lg font-bold">
                        ₩{(store.originalPrice * (100 - store.discountRate) / 100).toLocaleString()}~
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 골목별 럭키코스 추천 */}
        <section className="border-t-8 border-gray-100 pt-6">
          <Link href="/explore/locations" className="block px-4 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">골목별 럭키코스 추천</h2>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-6">
            {locationPicks.map((location) => (
              <Link
                key={location.id}
                href={`/explore/location/${location.id}`}
                className="flex-shrink-0"
              >
                <div className={`relative w-36 h-44 rounded-2xl overflow-hidden ${location.bgColor}`}>
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-lg font-bold">
                        {location.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-1">
                        {location.subtitle}
                      </p>
                    </div>
                    <span className="text-white/50 text-xs">
                      {location.storeCount}개 가게
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 에디터 픽 */}
        {editorPicks.map((pick) => (
          <section key={pick.id} className="border-t-8 border-gray-100">
            <div className="bg-stone-900 px-4 py-6">
              <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-xs font-medium rounded-full mb-3">
                {pick.tag}
              </span>
              <h2 className="text-white text-xl font-bold leading-tight whitespace-pre-line">
                {pick.title}
              </h2>

              <div className="flex gap-3 mt-5 overflow-x-auto scrollbar-hide -mx-4 px-4">
                {pick.stores.map((store, idx) => (
                  <Link
                    key={idx}
                    href={`/store/${idx + 1}`}
                    className="flex-shrink-0 w-44"
                  >
                    <div className="aspect-square rounded-xl bg-white/10 mb-2" />
                    <h4 className="text-white font-medium text-sm">{store.name}</h4>
                    <p className="text-white/60 text-xs mt-0.5">{store.item}</p>
                    <span className="text-green-400 text-sm font-bold mt-1 block">
                      {store.discount}% OFF
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* 먼저 준비할수록 */}
        <section className="border-t-8 border-gray-100 pt-6">
          <Link href="/explore/early-bird" className="block px-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{earlyBirdSection.title}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{earlyBirdSection.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          <div className="px-4 pb-6 space-y-3">
            {earlyBirdSection.stores.map((store) => (
              <Link
                key={store.id}
                href={`/store/${store.id}`}
                className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {store.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold mt-1.5">{store.name}</h3>
                  <p className="text-sm text-gray-500">{store.location}</p>
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-green-500 font-bold">{store.discountRate}%</span>
                    <span className="font-bold">
                      ₩{(store.originalPrice * (100 - store.discountRate) / 100).toLocaleString()}~
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₩{store.originalPrice.toLocaleString()}
                    </span>
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
