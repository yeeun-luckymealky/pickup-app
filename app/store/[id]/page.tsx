import { ArrowLeft, Heart, Share2, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import storesData from '@/data/stores.json';
import type { Store } from '@/types/store';

interface StoreDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

function calculateDiscountRate(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

const BREAD_EMOJIS = ['🥐', '🍞', '🥖', '🧁', '🍰', '🥯', '🥨', '🍩'];

function getBreadEmoji(index: number): string {
  return BREAD_EMOJIS[index % BREAD_EMOJIS.length];
}

export default async function StoreDetailPage({ params }: StoreDetailPageProps) {
  const { id } = await params;
  const stores: Store[] = storesData as Store[];
  const store = stores.find((s) => s.id === id);

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-900">가게를 찾을 수 없습니다</p>
        <Link href="/" className="mt-4 text-green-500 font-medium">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Store info */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">{store.name}</h1>
          {store.isNew && (
            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
              신규입점
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{formatDistance(store.distance)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>오늘 21:00까지</span>
          </div>
        </div>
        {store.quickPickup && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-green-50 text-green-500 text-xs font-medium rounded">
              빠른픽업 가능
            </span>
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">판매 중인 메뉴</h2>
        <div className="space-y-4">
          {store.menuItems.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="w-24 h-24 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">{getBreadEmoji(index)}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-medium">{item.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-green-500">
                    {formatPrice(item.salePrice)}원
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(item.originalPrice)}원
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    -{calculateDiscountRate(item.originalPrice, item.salePrice)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto">
          <button className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors">
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}
