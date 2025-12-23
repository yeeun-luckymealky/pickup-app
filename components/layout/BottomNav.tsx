'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, ClipboardList, User } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/explore', label: '탐색', icon: Compass },
  { href: '/order-status', label: '주문현황', icon: ClipboardList },
  { href: '/mypage', label: '내럭키밀', icon: User },
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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pointer-events-none safe-area-bottom">
      <nav className="max-w-md mx-auto bg-white rounded-full shadow-lg pointer-events-auto border border-gray-100">
        <div className="flex justify-around items-center h-14 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[10px] mt-0.5 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
