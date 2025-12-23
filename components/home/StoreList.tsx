'use client';

import { useMemo } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import StoreCard from './StoreCard';
import EventBanner from './EventBanner';
import type { Store } from '@/types/store';
import type { Event } from '@/types/store';

interface StoreListProps {
  stores: Store[];
  events: Event[];
}

export default function StoreList({ stores, events }: StoreListProps) {
  const { pickupDate, quickPickup, parkingAvailable, sortBy, searchQuery } = useFilterStore();

  const filteredAndSortedStores = useMemo(() => {
    let result = stores.filter((store) => {
      // Filter by pickup date
      if (pickupDate === 'today' && !store.pickupAvailable.today) return false;
      if (pickupDate === 'tomorrow' && !store.pickupAvailable.tomorrow)
        return false;

      // Filter by quick pickup
      if (quickPickup && !store.quickPickup) return false;

      // Filter by parking available
      if (parkingAvailable && !store.parkingAvailable) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = store.name.toLowerCase().includes(query);
        const menuMatch = store.menuItems.some((item) =>
          item.name.toLowerCase().includes(query)
        );
        if (!nameMatch && !menuMatch) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'favorites':
          return b.favoriteCount - a.favoriteCount;
        case 'notifications':
          return b.notificationCount - a.notificationCount;
        case 'priceLow': {
          const aMin = Math.min(...a.menuItems.map((m) => m.salePrice));
          const bMin = Math.min(...b.menuItems.map((m) => m.salePrice));
          return aMin - bMin;
        }
        case 'priceHigh': {
          const aMax = Math.max(...a.menuItems.map((m) => m.salePrice));
          const bMax = Math.max(...b.menuItems.map((m) => m.salePrice));
          return bMax - aMax;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [stores, pickupDate, quickPickup, parkingAvailable, sortBy, searchQuery]);

  if (filteredAndSortedStores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg font-medium">검색 결과가 없습니다</p>
        <p className="text-sm mt-1">다른 조건으로 검색해 보세요</p>
      </div>
    );
  }

  // Insert event banners between stores
  const eventInsertInterval = 3;
  const items: (Store | Event)[] = [];
  let eventIndex = 0;

  filteredAndSortedStores.forEach((store, index) => {
    items.push(store);
    if (
      (index + 1) % eventInsertInterval === 0 &&
      eventIndex < events.length
    ) {
      items.push(events[eventIndex]);
      eventIndex++;
    }
  });

  return (
    <div className="space-y-4">
      {items.map((item) => {
        if ('menuItems' in item) {
          return <StoreCard key={item.id} store={item} />;
        }
        return <EventBanner key={item.id} event={item} />;
      })}
    </div>
  );
}
