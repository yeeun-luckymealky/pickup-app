'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, User } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/order-status', label: '주문현황', icon: ClipboardList },
  { href: '/mypage', label: '마이페이지', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { isModalOpen } = useUIStore();

  // 특정 페이지에서는 네비게이션 바 숨김
  if (pathname === '/search' || pathname === '/guide') {
    return null;
  }

  // 모달이 열려있으면 숨김
  if (isModalOpen) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
