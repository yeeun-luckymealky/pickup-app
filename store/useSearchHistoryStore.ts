'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_HISTORY = 10;

interface SearchHistoryState {
  history: string[];
}

interface SearchHistoryActions {
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState & SearchHistoryActions>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (query) =>
        set((state) => {
          const trimmedQuery = query.trim();
          if (!trimmedQuery) return state;

          // Remove duplicate and add to top
          const filtered = state.history.filter((q) => q !== trimmedQuery);
          const newHistory = [trimmedQuery, ...filtered].slice(0, MAX_HISTORY);
          return { history: newHistory };
        }),
      removeSearch: (query) =>
        set((state) => ({
          history: state.history.filter((q) => q !== query),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-history',
    }
  )
);
