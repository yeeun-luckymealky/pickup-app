'use client';

import { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useUIStore } from '@/store/useUIStore';
import { SORT_OPTIONS } from '@/types/filter';
import Toggle from '@/components/ui/Toggle';
import SortModal from './SortModal';
import LocationModal from './LocationModal';

export default function FilterSection() {
  const {
    location,
    setLocation,
    pickupDate,
    quickPickup,
    setQuickPickup,
    sortBy,
  } = useFilterStore();
  const { setModalOpen } = useUIStore();
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // 모달 상태가 변경될 때 전역 상태 업데이트
  useEffect(() => {
    setModalOpen(isSortModalOpen || isLocationModalOpen);
  }, [isSortModalOpen, isLocationModalOpen, setModalOpen]);

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || '가까운 순';

  return (
    <>
      <div className="flex items-center gap-2 py-3">
        {/* 주소 - 고정 영역 */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition-colors flex-shrink-0"
        >
          <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="truncate max-w-[100px]">{location}</span>
          <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
        </button>

        {/* 필터들 - 가로 스크롤 영역 */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          {/* 오늘 픽업 - 오늘 픽업일 때만 표시 */}
          {pickupDate === 'today' && (
            <Toggle
              enabled={quickPickup}
              onChange={setQuickPickup}
              label="오늘 픽업"
            />
          )}

          <button
            onClick={() => setIsSortModalOpen(true)}
            className="flex items-center gap-1 px-3 h-7 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0 whitespace-nowrap"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onSelectLocation={setLocation}
      />
    </>
  );
}
