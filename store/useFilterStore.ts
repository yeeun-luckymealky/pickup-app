'use client';

import { create } from 'zustand';
import type { FilterState, PickupDate, SortOption, CategoryOption } from '@/types/filter';

interface FilterActions {
  setPickupDate: (date: PickupDate) => void;
  setQuickPickup: (enabled: boolean) => void;
  setParkingAvailable: (enabled: boolean) => void;
  setSortBy: (option: SortOption) => void;
  setCategory: (category: CategoryOption) => void;
  setSearchQuery: (query: string) => void;
  setLocation: (location: string) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  pickupDate: 'today',
  quickPickup: false,
  parkingAvailable: false,
  sortBy: 'distance',
  category: 'all',
  searchQuery: '',
  location: '서울 강남구',
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setPickupDate: (date) => set((state) => ({
    pickupDate: date,
    quickPickup: date === 'tomorrow' ? false : state.quickPickup
  })),
  setQuickPickup: (enabled) => set({ quickPickup: enabled }),
  setParkingAvailable: (enabled) => set({ parkingAvailable: enabled }),
  setSortBy: (option) => set({ sortBy: option }),
  setCategory: (category) => set({ category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLocation: (location) => set({ location }),
  resetFilters: () => set({ quickPickup: false, parkingAvailable: false, sortBy: 'distance', category: 'all' }),
}));
