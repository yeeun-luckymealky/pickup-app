'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Heart, Locate } from 'lucide-react';
import type { Store } from '@/types/store';
import type { SheetPosition } from './BottomSheet';

interface MapViewProps {
  stores: Store[];
  sheetPosition: SheetPosition;
  onLoadMore: () => void;
  onStoreSelect?: (store: Store) => void;
  showFavoritesOnly?: boolean;
  onToggleFavorites?: () => void;
  hideButtons?: boolean;
}

export default function MapView({ stores, sheetPosition, onLoadMore, onStoreSelect, showFavoritesOnly, onToggleFavorites, hideButtons }: MapViewProps) {
  const isCollapsed = sheetPosition === 'collapsed';

  const getMapBottom = () => {
    switch (sheetPosition) {
      case 'collapsed':
        return '80px';
      case 'half':
        return '50%';
      case 'full':
        return '0';
    }
  };

  const getButtonBottom = () => {
    switch (sheetPosition) {
      case 'collapsed':
        return 'calc(80px + 16px)';
      case 'half':
        return 'calc(50% + 16px)';
      case 'full':
        return '16px';
    }
  };

  const handleGoToMyLocation = useCallback(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = new window.naver.maps.LatLng(latitude, longitude);
          mapRef.current?.setCenter(newCenter);
          mapRef.current?.setZoom(16);
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          alert('위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
        }
      );
    } else {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
    }
  }, []);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || !window.naver?.maps) return;

    try {
      // 강남역 기준 좌표
      const defaultCenter = new window.naver.maps.LatLng(37.4979, 127.0276);

      const options: naver.maps.MapOptions = {
        center: defaultCenter,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      };

      mapRef.current = new window.naver.maps.Map(mapContainerRef.current, options);
      setIsMapLoaded(true);
    } catch (error) {
      console.error('네이버 지도 초기화 오류:', error);
      setMapError('지도를 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  // SDK 로드 확인 및 지도 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 네이버 SDK가 로드되었는지 확인
    if (window.naver?.maps) {
      initializeMap();
    } else {
      // SDK가 아직 로드되지 않은 경우
      const checkNaverLoaded = setInterval(() => {
        if (window.naver?.maps) {
          clearInterval(checkNaverLoaded);
          initializeMap();
        }
      }, 100);

      // 5초 후에도 로드되지 않으면 에러 처리
      const timeout = setTimeout(() => {
        clearInterval(checkNaverLoaded);
        if (!window.naver?.maps) {
          setMapError('네이버 지도 API를 불러올 수 없습니다.');
        }
      }, 5000);

      return () => {
        clearInterval(checkNaverLoaded);
        clearTimeout(timeout);
      };
    }
  }, [initializeMap]);

  // 마커 생성 및 업데이트
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    stores.forEach((store, index) => {
      const position = new window.naver.maps.LatLng(
        store.coordinates.lat,
        store.coordinates.lng
      );

      // 커스텀 마커 아이콘
      const markerIcon: naver.maps.HtmlIcon = {
        content: `
          <div style="cursor: pointer; position: relative;">
            <div style="
              width: 40px;
              height: 40px;
              background-color: #22c55e;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              border: 2px solid white;
            ">
              <span style="color: white; font-size: 14px; font-weight: bold;">${index + 1}</span>
            </div>
            <div style="
              position: absolute;
              bottom: -4px;
              left: 50%;
              transform: translateX(-50%) rotate(45deg);
              width: 12px;
              height: 12px;
              background-color: #22c55e;
              border-right: 2px solid white;
              border-bottom: 2px solid white;
            "></div>
          </div>
        `,
        size: new window.naver.maps.Size(40, 50),
        anchor: new window.naver.maps.Point(20, 50),
      };

      const marker = new window.naver.maps.Marker({
        position,
        map: mapRef.current!,
        icon: markerIcon,
      });

      markersRef.current.push(marker);

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (onStoreSelect) {
          onStoreSelect(store);
        }
        // 클릭한 마커로 지도 이동
        mapRef.current?.panTo(position);
      });
    });

    // 모든 마커가 보이도록 지도 범위 조정
    if (stores.length > 0) {
      const bounds = new window.naver.maps.LatLngBounds();
      stores.forEach((store) => {
        bounds.extend(
          new window.naver.maps.LatLng(store.coordinates.lat, store.coordinates.lng)
        );
      });
      mapRef.current.fitBounds(bounds, 50);
    }
  }, [stores, isMapLoaded, onStoreSelect]);

  // API 키가 없거나 에러 발생 시 플레이스홀더 표시
  if (mapError) {
    return (
      <div className="absolute inset-0 bg-gray-100">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ bottom: getMapBottom() }}
        >
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-gray-600 font-medium">{mapError}</p>
            <p className="text-sm text-gray-400 mt-2">
              .env.local 파일에 NEXT_PUBLIC_NAVER_CLIENT_ID를 확인하세요
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {stores.length}개 가게 데이터 준비됨
            </p>
          </div>
        </div>

        {isCollapsed && (
          <button
            onClick={onLoadMore}
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            가게 더 불러오기
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-100">
      {/* 네이버 지도 컨테이너 */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        style={{ bottom: getMapBottom() }}
      />

      {/* 로딩 중 표시 */}
      {!isMapLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          style={{ bottom: getMapBottom() }}
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">지도 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* Load more button - shown when bottom sheet is collapsed */}
      {isCollapsed && (
        <button
          onClick={onLoadMore}
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors z-10"
        >
          가게 더 불러오기
        </button>
      )}

      {/* 오른쪽 하단 버튼 그룹 - 검색 화면에서는 숨김 */}
      {!hideButtons && (
        <div
          className="absolute right-4 flex flex-col gap-2 z-[100] transition-all duration-300"
          style={{ bottom: getButtonBottom() }}
        >
          {/* 즐겨찾기 토글 버튼 */}
          {onToggleFavorites && (
            <button
              onClick={onToggleFavorites}
              className={`p-3 rounded-full shadow-lg transition-all ${
                showFavoritesOnly
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={showFavoritesOnly ? '전체 보기' : '즐겨찾기만 보기'}
            >
              <Heart
                className={`w-5 h-5 ${showFavoritesOnly ? 'fill-white' : ''}`}
              />
            </button>
          )}

          {/* 내 현위치 버튼 */}
          <button
            onClick={handleGoToMyLocation}
            className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:bg-gray-50 transition-all"
            aria-label="내 현위치로 이동"
          >
            <Locate className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
