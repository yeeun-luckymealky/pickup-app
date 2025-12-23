'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedLocations {
  home: string | null;
  work: string | null;
}

interface SavedLocationActions {
  setHome: (location: string) => void;
  setWork: (location: string) => void;
  clearHome: () => void;
  clearWork: () => void;
}

export const useSavedLocationStore = create<SavedLocations & SavedLocationActions>()(
  persist(
    (set) => ({
      home: '서울 강남구',
      work: null,
      setHome: (location) => set({ home: location }),
      setWork: (location) => set({ work: location }),
      clearHome: () => set({ home: null }),
      clearWork: () => set({ work: null }),
    }),
    {
      name: 'saved-locations',
    }
  )
);
