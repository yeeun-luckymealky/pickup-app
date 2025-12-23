'use client';

import { useFilterStore } from '@/store/useFilterStore';
import type { PickupDate } from '@/types/filter';

export default function PickupDateToggle() {
  const { pickupDate, setPickupDate } = useFilterStore();

  const options: { value: PickupDate; label: string }[] = [
    { value: 'today', label: '오늘 픽업' },
    { value: 'tomorrow', label: '내일 픽업' },
  ];

  const selectedIndex = options.findIndex((opt) => opt.value === pickupDate);

  return (
    <div className="relative flex bg-gray-100 rounded-lg p-1">
      {/* 슬라이딩 인디케이터 */}
      <div
        className="absolute top-1 bottom-1 bg-green-500 rounded-md transition-transform duration-200 ease-out"
        style={{
          width: `calc(50% - 4px)`,
          transform: `translateX(${selectedIndex * 100}%)`,
          left: '4px',
        }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setPickupDate(option.value)}
          className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            pickupDate === option.value
              ? 'text-white'
              : 'text-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
