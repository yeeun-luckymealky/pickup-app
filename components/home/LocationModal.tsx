'use client';

import { useState, useEffect } from 'react';
import { X, Search, Crosshair, Home, ChevronRight } from 'lucide-react';
import { useSavedLocationStore } from '@/store/useSavedLocationStore';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

type ViewMode = 'main' | 'search' | 'map';

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: LocationModalProps) {
  const { home, setHome } = useSavedLocationStore();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  // 모달이 열릴 때 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setViewMode('main');
      setSearchQuery('');
      setSelectedAddress(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 현재 위치로 주소 찾기
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 임시로 좌표 기반 주소 설정 (실제로는 reverse geocoding 필요)
          setSelectedAddress({
            name: '현재 위치',
            address: `위도: ${latitude.toFixed(4)}, 경도: ${longitude.toFixed(4)}`,
            lat: latitude,
            lng: longitude,
          });
          setViewMode('map');
        },
        (error) => {
          alert('위치 정보를 가져올 수 없습니다.');
          console.error(error);
        }
      );
    } else {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
    }
  };

  // 주소 검색 결과 선택 (데모용)
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSelectedAddress({
        name: searchQuery,
        address: `서울특별시 ${searchQuery}`,
        lat: 37.5665,
        lng: 126.9780,
      });
      setViewMode('map');
    }
  };

  // 주소 설정 완료
  const handleConfirmAddress = () => {
    if (selectedAddress) {
      onSelectLocation(selectedAddress.address);
      onClose();
    }
  };

  // 집으로 등록
  const handleSetAsHome = () => {
    if (selectedAddress) {
      setHome(selectedAddress.address);
      onSelectLocation(selectedAddress.address);
      onClose();
    }
  };

  // 메인 뷰 (주소 관리)
  const renderMainView = () => (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button onClick={onClose} className="p-1">
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-lg font-bold">주소 관리</h2>
        <div className="w-8" />
      </div>

      {/* 검색창 */}
      <div className="px-4 py-4">
        <button
          onClick={() => setViewMode('search')}
          className="flex items-center gap-3 w-full py-3 border-b border-gray-200"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400">도로명, 건물명 또는 지번으로 검색</span>
        </button>
      </div>

      {/* 현재 위치로 주소 찾기 */}
      <div className="px-4">
        <button
          onClick={handleCurrentLocation}
          className="flex items-center justify-center gap-2 w-full py-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
        >
          <Crosshair className="w-5 h-5" />
          <span>현재 위치로 주소 찾기</span>
        </button>
      </div>

      {/* 집 추가 */}
      <div className="px-4 mt-6">
        <button
          onClick={() => {
            setViewMode('search');
          }}
          className="flex items-center gap-3 w-full py-3"
        >
          <Home className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{home ? '집 수정' : '집 추가'}</span>
          {home && (
            <span className="text-sm text-gray-400 ml-auto truncate max-w-[150px]">
              {home}
            </span>
          )}
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );

  // 검색 뷰
  const renderSearchView = () => (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button onClick={() => setViewMode('main')} className="p-1">
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-lg font-bold">주소 관리</h2>
        <div className="w-8" />
      </div>

      {/* 검색 입력 */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 py-3 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder="도로명, 건물명 또는 지번으로 검색"
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            autoFocus
          />
        </div>
      </div>

      {/* 현재 위치로 주소 찾기 */}
      <div className="px-4">
        <button
          onClick={handleCurrentLocation}
          className="flex items-center justify-center gap-2 w-full py-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
        >
          <Crosshair className="w-5 h-5" />
          <span>현재 위치로 주소 찾기</span>
        </button>
      </div>

      {/* 검색 결과 (데모) */}
      {searchQuery && (
        <div className="px-4 mt-4">
          <button
            onClick={handleSearchSubmit}
            className="w-full text-left py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <p className="font-medium text-gray-900">{searchQuery}</p>
            <p className="text-sm text-gray-500">서울특별시 {searchQuery}</p>
          </button>
        </div>
      )}
    </div>
  );

  // 지도 확인 뷰
  const renderMapView = () => (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setViewMode('main')}
          className="p-2 bg-white rounded-full shadow-md"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full">
          입력하신 주소지를 확인해주세요
        </div>
      </div>

      {/* 지도 영역 (placeholder) */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center relative">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-xs">배달위치</span>
          </div>
          <p className="text-gray-500 text-sm">지도 영역</p>
          <p className="text-gray-400 text-xs mt-1">
            {selectedAddress?.lat.toFixed(4)}, {selectedAddress?.lng.toFixed(4)}
          </p>
        </div>
      </div>

      {/* 하단 주소 정보 */}
      <div className="bg-white px-4 py-5 rounded-t-2xl -mt-4 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedAddress?.name}
            </h3>
            <p className="text-gray-500 mt-1">{selectedAddress?.address}</p>
          </div>
          <button
            onClick={() => setViewMode('search')}
            className="text-blue-500 font-medium"
          >
            수정
          </button>
        </div>

        <button
          onClick={handleConfirmAddress}
          className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg"
        >
          설정하기
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {viewMode === 'main' && renderMainView()}
      {viewMode === 'search' && renderSearchView()}
      {viewMode === 'map' && renderMapView()}
    </div>
  );
}
