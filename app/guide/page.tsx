import { ArrowLeft, Search, ShoppingBag, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    title: '1. 가게 찾기',
    description: '오늘 또는 내일 픽업 가능한 가게를 검색하세요. 거리순, 가격순 등 다양한 정렬 옵션을 활용할 수 있어요.',
  },
  {
    icon: ShoppingBag,
    title: '2. 메뉴 선택',
    description: '마감 할인된 메뉴를 선택하고 주문하세요. 최대 70%까지 할인된 가격으로 구매할 수 있어요.',
  },
  {
    icon: Clock,
    title: '3. 픽업 시간 확인',
    description: '주문 후 가게에서 안내하는 픽업 시간을 확인하세요. 빠른픽업 가게는 30분 이내에 픽업 가능해요.',
  },
  {
    icon: CheckCircle,
    title: '4. 픽업 완료',
    description: '가게에 방문하여 주문한 메뉴를 픽업하세요. 앱에서 주문번호를 보여주시면 됩니다.',
  },
];

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">이용 가이드</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">마감할인 이용 방법</h2>
          <p className="mt-2 text-gray-500">간단한 4단계로 할인된 음식을 픽업하세요</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-xl">
          <h3 className="font-bold text-green-600">알아두세요!</h3>
          <ul className="mt-2 space-y-2 text-sm text-green-700">
            <li>- 마감 할인 상품은 수량이 한정되어 있어요</li>
            <li>- 픽업 시간을 꼭 지켜주세요</li>
            <li>- 주문 취소는 픽업 1시간 전까지 가능해요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
