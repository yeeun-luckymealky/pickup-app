'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: Set<string>;
  toggleFavorite: (storeId: string) => void;
  isFavorite: (storeId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      toggleFavorite: (storeId) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(storeId)) {
            newFavorites.delete(storeId);
          } else {
            newFavorites.add(storeId);
          }
          return { favorites: newFavorites };
        }),
      isFavorite: (storeId) => get().favorites.has(storeId),
    }),
    {
      name: 'favorite-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: new Set(parsed.state.favorites),
            },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            ...value,
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites),
            },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
