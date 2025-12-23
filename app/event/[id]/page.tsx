import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import eventsData from '@/data/events.json';
import type { Event } from '@/types/store';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const events: Event[] = eventsData as Event[];
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-900">이벤트를 찾을 수 없습니다</p>
        <Link href="/" className="mt-4 text-green-500 font-medium">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1">
        {/* Event banner placeholder */}
        <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <p className="text-white text-xl font-bold text-center px-4">{event.title}</p>
        </div>

        {/* Event content */}
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            마감할인과 함께하는 특별한 이벤트입니다.
            지금 바로 참여하고 다양한 혜택을 받아보세요!
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">이벤트 안내</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>- 이벤트 기간: 2024년 1월 1일 ~ 2024년 12월 31일</li>
              <li>- 참여 방법: 앱에서 첫 주문 시 자동 적용</li>
              <li>- 중복 참여 불가</li>
            </ul>
          </div>

          <button className="w-full mt-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors">
            이벤트 참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
