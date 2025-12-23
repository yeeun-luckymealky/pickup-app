'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import type { Store } from '@/types/store';

interface StoreCardProps {
  store: Store;
}

const BREAD_EMOJIS = ['🥐', '🍞', '🥖', '🧁', '🍰', '🥯', '🥨', '🍩'];

function getBreadEmoji(index: number): string {
  return BREAD_EMOJIS[index % BREAD_EMOJIS.length];
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

function calculateDiscountRate(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

export default function StoreCard({ store }: StoreCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const favorite = isFavorite(store.id);

  const lowestPriceItem = store.menuItems.reduce((min, item) =>
    item.salePrice < min.salePrice ? item : min
  );

  const discountRate = calculateDiscountRate(
    lowestPriceItem.originalPrice,
    lowestPriceItem.salePrice
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(store.id);
  };

  return (
    <Link
      href={`/store/${store.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* Menu images slider */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 p-1">
          {store.menuItems.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-amber-50"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl">{getBreadEmoji(index)}</span>
                <span className="text-xs text-amber-700 mt-1 px-1 text-center line-clamp-1">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          aria-label={favorite ? '찜 해제' : '찜하기'}
        >
          <Heart
            className={`w-5 h-5 ${
              favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Store info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{store.name}</h3>
          {store.isNew && (
            <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-full">
              신규입점
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-green-500">
            {formatPrice(lowestPriceItem.salePrice)}원
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(lowestPriceItem.originalPrice)}원
          </span>
          <span className="text-sm font-semibold text-red-500">
            -50%
          </span>
        </div>

        {/* Distance & quick pickup */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span>{formatDistance(store.distance)}</span>
          {store.quickPickup && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-green-500 font-medium">빠른픽업</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
