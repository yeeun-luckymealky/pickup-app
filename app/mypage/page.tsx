import { User, ChevronRight, Heart, Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { href: '/mypage/favorites', label: '찜한 가게', icon: Heart },
  { href: '/mypage/notifications', label: '알림 설정', icon: Bell },
  { href: '/mypage/settings', label: '앱 설정', icon: Settings },
  { href: '/guide', label: '이용 가이드', icon: HelpCircle },
];

export default function MyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">마이페이지</h1>
        </div>
      </header>

      {/* Profile section */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">로그인이 필요합니다</p>
            <p className="text-sm text-gray-500">로그인하고 다양한 혜택을 받아보세요</p>
          </div>
        </div>
        <button className="w-full mt-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
          로그인 / 회원가입
        </button>
      </div>

      {/* Menu items */}
      <div className="flex-1">
        <nav className="divide-y divide-gray-100">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button className="flex items-center gap-3 text-gray-500 hover:text-gray-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
