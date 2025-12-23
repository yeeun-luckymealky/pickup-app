export const CATEGORIES = [
  '샐러드',
  '피자',
  '한식',
  '디저트',
  '빵',
  '과일',
  '식사빵',
] as const;

export type Category = (typeof CATEGORIES)[number];
