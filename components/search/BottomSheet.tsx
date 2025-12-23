'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';
import StoreCard from '@/components/home/StoreCard';
import EventRolling from './EventRolling';
import type { Store, Event } from '@/types/store';

export type SheetPosition = 'collapsed' | 'half' | 'full';

interface BottomSheetProps {
  stores: Store[];
  events: Event[];
  position: SheetPosition;
  onPositionChange: (position: SheetPosition) => void;
  showFavoritesOnly: boolean;
  hasFavorites: boolean;
}

export default function BottomSheet({
  stores,
  events,
  position,
  onPositionChange,
  showFavoritesOnly,
  hasFavorites,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setDragDelta(0);
  }, []);

  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;
      const diff = clientY - startY;
      setDragDelta(diff);
    },
    [isDragging, startY]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = 80;

    if (position === 'half') {
      if (dragDelta < -threshold) {
        onPositionChange('full');
      } else if (dragDelta > threshold) {
        onPositionChange('collapsed');
      }
    } else if (position === 'full') {
      if (dragDelta > threshold) {
        onPositionChange('half');
      }
    } else if (position === 'collapsed') {
      if (dragDelta < -threshold) {
        onPositionChange('half');
      }
    }

    setDragDelta(0);
  }, [dragDelta, position, onPositionChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleExpand = () => {
    onPositionChange('half');
  };

  const getHeight = () => {
    switch (position) {
      case 'collapsed':
        return '80px';
      case 'half':
        return '50%';
      case 'full':
        return '100%';
    }
  };

  return (
    <div
      ref={sheetRef}
      className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl ${
        isDragging ? '' : 'transition-all duration-300'
      }`}
      style={{
        height: getHeight(),
      }}
    >
      {/* Drag handle */}
      <div
        className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onClick={position === 'collapsed' ? handleExpand : undefined}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Content */}
      {position === 'collapsed' ? (
        <EventRolling events={events} />
      ) : (
        <div className="flex flex-col h-[calc(100%-40px)] overflow-hidden">
          {/* Event rolling */}
          <EventRolling events={events} />

          {/* Store list */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {showFavoritesOnly && !hasFavorites ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Heart className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-lg font-medium">찜한 가게가 없어요</p>
                <p className="text-sm mt-1">마음에 드는 가게를 찜해보세요</p>
              </div>
            ) : stores.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p className="text-lg font-medium">검색 결과가 없습니다</p>
                <p className="text-sm mt-1">다른 조건으로 검색해 보세요</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
