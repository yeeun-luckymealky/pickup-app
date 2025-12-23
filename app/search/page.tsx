'use client';

import { useState, useMemo } from 'react';
import SearchHeader from '@/components/search/SearchHeader';
import SearchInputView from '@/components/search/SearchInputView';
import MapView from '@/components/search/MapView';
import BottomSheet, { type SheetPosition } from '@/components/search/BottomSheet';
import { useFilterStore } from '@/store/useFilterStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import storesData from '@/data/stores.json';
import eventsData from '@/data/events.json';
import { CATEGORIES } from '@/data/categories';
import type { Store, Event } from '@/types/store';

export default function SearchPage() {
  const [isInputMode, setIsInputMode] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sheetPosition, setSheetPosition] = useState<SheetPosition>('half');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { pickupDate, quickPickup, sortBy, searchQuery } = useFilterStore();
  const { favorites, isFavorite } = useFavoriteStore();

  const stores: Store[] = storesData as Store[];
  const events: Event[] = eventsData as Event[];

  const filteredStores = useMemo(() => {
    let result = stores.filter((store) => {
      // Filter by pickup date
      if (pickupDate === 'today' && !store.pickupAvailable.today) return false;
      if (pickupDate === 'tomorrow' && !store.pickupAvailable.tomorrow)
        return false;

      // Filter by quick pickup
      if (quickPickup && !store.quickPickup) return false;

      // Filter by favorites
      if (showFavoritesOnly && !isFavorite(store.id)) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = store.name.toLowerCase().includes(query);
        const menuMatch = store.menuItems.some((item) =>
          item.name.toLowerCase().includes(query)
        );
        if (!nameMatch && !menuMatch) return false;
      }

      // Filter by category
      if (selectedCategory) {
        const categoryMatch = store.menuItems.some((item) =>
          item.name.toLowerCase().includes(selectedCategory.toLowerCase())
        ) || store.name.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!categoryMatch) return false;
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
  }, [stores, pickupDate, quickPickup, sortBy, searchQuery, showFavoritesOnly, isFavorite, selectedCategory]);

  const hasFavorites = favorites.size > 0;

  const handleLoadMore = () => {
    // In real app, this would fetch more stores based on map bounds
    console.log('Load more stores');
  };

  return (
    <div className="flex flex-col h-screen bg-white -mb-32">
      <SearchHeader onSearchClick={() => setIsInputMode(true)} />

      {/* 카테고리 필터 */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 text-sm font-medium text-gray-700">추천 카테고리</span>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
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

      <div className="flex-1 relative overflow-hidden">
        <MapView
          stores={filteredStores}
          sheetPosition={sheetPosition}
          onLoadMore={handleLoadMore}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
          hideButtons={isInputMode}
        />

        <BottomSheet
          stores={filteredStores}
          events={events}
          position={sheetPosition}
          onPositionChange={setSheetPosition}
          showFavoritesOnly={showFavoritesOnly}
          hasFavorites={hasFavorites}
        />
      </div>

      {/* 검색 입력 오버레이 */}
      {isInputMode && (
        <SearchInputView onClose={() => setIsInputMode(false)} />
      )}
    </div>
  );
}
