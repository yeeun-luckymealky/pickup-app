'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Bell, Star } from 'lucide-react';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import type { Store } from '@/types/store';

interface StoreCardProps {
  store: Store;
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

export default function StoreCard({ store }: StoreCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const favorite = isFavorite(store.id);

  const lowestPriceItem = store.menuItems.reduce((min, item) =>
    item.salePrice < min.salePrice ? item : min
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(store.id);
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: 알림 설정 로직
  };

  // 오늘/내일 픽업 가능 여부
  const isToday = store.pickupAvailable.today;
  const pickupDay = isToday ? '오늘' : '내일';

  // 오늘: 주황색, 내일: 파란색
  const badgeTextColor = isToday ? 'text-orange-500' : 'text-blue-500';
  const dayBadgeBg = isToday ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600';

  return (
    <Link href={`/store/${store.id}`} className="block">
      {/* 이미지 영역 - 2개 나란히 */}
      <div className="flex gap-[2px] h-[140px] overflow-hidden rounded-lg">
        <div className="relative flex-1 bg-gray-100">
          {store.images[0] ? (
            <Image
              src={store.images[0]}
              alt={store.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-amber-100 flex items-center justify-center">
              <span className="text-4xl">🥐</span>
            </div>
          )}
          {/* 예약 가능 배지 */}
          <div className={`absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 rounded-full text-sm font-medium ${badgeTextColor}`}>
            {pickupDay} {store.availableCount >= 5 ? '5+' : store.availableCount}개 예약가능
          </div>
        </div>
        <div className="relative flex-1 bg-gray-100">
          {store.images[1] ? (
            <Image
              src={store.images[1]}
              alt={store.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-amber-50 flex items-center justify-center">
              <span className="text-4xl">🥖</span>
            </div>
          )}
        </div>
      </div>

      {/* 가게 정보 */}
      <div className="pt-3 pb-4">
        {/* 상단: 가게명 + 거리 + 리뷰 + 아이콘 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {store.isNew && (
              <span className="text-red-500 text-sm font-bold">NEW</span>
            )}
            <h3 className="font-bold text-gray-900 text-[17px]">{store.name}</h3>
            <span className="text-sm text-gray-400 ml-1">{formatDistance(store.distance)}</span>
            <span className="flex items-center text-sm text-gray-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
              {store.reviewCount}개
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleFavoriteClick}
              className="p-1"
              aria-label={favorite ? '저장 해제' : '저장하기'}
            >
              <Bookmark
                className={`w-5 h-5 ${
                  favorite ? 'fill-gray-900 text-gray-900' : 'text-gray-400'
                }`}
              />
            </button>
            <button
              onClick={handleNotificationClick}
              className="p-1"
              aria-label="알림 설정"
            >
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 메뉴 태그 */}
        <p className="mt-1 text-sm text-gray-500">
          {store.menuItems.slice(0, 3).map((item, idx) => (
            <span key={item.id}>
              {item.name}
              {idx < Math.min(store.menuItems.length, 3) - 1 && ' | '}
            </span>
          ))}
        </p>

        {/* 하단: 픽업 시간 + 가격 */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${dayBadgeBg}`}>
              {pickupDay}
            </span>
            <span className="text-sm text-gray-600">{store.pickupTime}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(lowestPriceItem.originalPrice)}원
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(lowestPriceItem.salePrice)}원
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
