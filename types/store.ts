export interface MenuItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Store {
  id: string;
  name: string;
  address: string; // 가게 주소 (예: "서울시 송파구 잠실동")
  menuItems: MenuItem[];
  images: string[]; // 가게 대표 이미지들
  distance: number; // meters
  isNew: boolean;
  reviewCount: number;
  favoriteCount: number;
  notificationCount: number;
  pickupAvailable: {
    today: boolean;
    tomorrow: boolean;
  };
  pickupTime: string; // 픽업 시간 (예: "08:20 ~ 09:30")
  availableCount: number; // 예약 가능 수량
  quickPickup: boolean; // 빠른 픽업 가능 여부
  parkingAvailable: boolean; // 주차 가능 여부
  coordinates: Coordinates; // 가게 위치 좌표
}

export interface Event {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface Curation {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  bgColor: string; // Tailwind gradient classes (e.g., "from-amber-100 to-orange-100")
}
