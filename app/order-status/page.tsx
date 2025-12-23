import { ClipboardList } from 'lucide-react';

export default function OrderStatusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">주문 현황</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-900">주문 내역이 없습니다</p>
        <p className="text-sm text-gray-500 mt-1">첫 주문을 해보세요!</p>
      </div>
    </div>
  );
}
