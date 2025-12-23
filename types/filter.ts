export type PickupDate = 'today' | 'tomorrow';

export interface LocationData {
  [city: string]: string[];
}

export interface SavedLocations {
  home: string | null;
  work: string | null;
}

export type SortOption =
  | 'distance'
  | 'reviews'
  | 'favorites'
  | 'notifications'
  | 'priceLow'
  | 'priceHigh';

export interface FilterState {
  pickupDate: PickupDate;
  quickPickup: boolean;
  parkingAvailable: boolean;
  sortBy: SortOption;
  searchQuery: string;
  location: string;
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'distance', label: '가까운 순' },
  { value: 'reviews', label: '리뷰 많은 순' },
  { value: 'favorites', label: '찜 많은 순' },
  { value: 'notifications', label: '알림 많은 순' },
  { value: 'priceLow', label: '낮은 가격순' },
  { value: 'priceHigh', label: '높은 가격순' },
];
