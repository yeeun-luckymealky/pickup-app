'use client';

import { Check } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useFilterStore } from '@/store/useFilterStore';
import { SORT_OPTIONS, type SortOption } from '@/types/filter';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SortModal({ isOpen, onClose }: SortModalProps) {
  const { sortBy, setSortBy } = useFilterStore();

  const handleSelect = (option: SortOption) => {
    setSortBy(option);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="정렬">
      <div className="space-y-1">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
              sortBy === option.value
                ? 'bg-green-50 text-green-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{option.label}</span>
            {sortBy === option.value && (
              <Check className="w-5 h-5 text-green-500" />
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
