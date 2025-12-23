'use client';

import { X, Check } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { CATEGORY_OPTIONS, type CategoryOption } from '@/types/filter';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const { category, setCategory } = useFilterStore();

  if (!isOpen) return null;

  const handleSelect = (value: CategoryOption) => {
    setCategory(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">메뉴 카테고리</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Options */}
        <div className="px-4 py-2 max-h-[50vh] overflow-y-auto">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className={`text-base ${category === option.value ? 'font-semibold text-green-600' : 'text-gray-700'}`}>
                {option.label}
              </span>
              {category === option.value && (
                <Check className="w-5 h-5 text-green-600" />
              )}
            </button>
          ))}
        </div>

        {/* Safe area */}
        <div className="h-8" />
      </div>
    </div>
  );
}
