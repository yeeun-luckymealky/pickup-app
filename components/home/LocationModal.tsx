'use client';

import { useState, useMemo, useEffect } from 'react';
import { Check, Home, Building2, Plus, Pencil, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import locationsData from '@/data/locations.json';
import { useSavedLocationStore } from '@/store/useSavedLocationStore';
import type { LocationData } from '@/types/filter';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

const locations: LocationData = locationsData as LocationData;
const cities = Object.keys(locations);

type RegisterMode = 'home' | 'work' | null;

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: LocationModalProps) {
  const { home, work, setHome, setWork, clearHome, clearWork } = useSavedLocationStore();
  const [registerMode, setRegisterMode] = useState<RegisterMode>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // 현재 선택된 시/구 파싱
  const [currentCity, currentDistrict] = useMemo(() => {
    const parts = currentLocation.split(' ');
    return [parts[0] || '서울', parts[1] || '전체'];
  }, [currentLocation]);

  const [selectedCity, setSelectedCity] = useState(currentCity);
  const [selectedDistrict, setSelectedDistrict] = useState(currentDistrict);

  // 모달이 열릴 때 상태 동기화
  useEffect(() => {
    if (isOpen) {
      setSelectedCity(currentCity);
      setSelectedDistrict(currentDistrict);
      setShowFavorites(false);
      setRegisterMode(null);
    }
  }, [isOpen, currentCity, currentDistrict]);

  // 선택된 시의 구 목록
  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return locations[selectedCity] || ['전체'];
  }, [selectedCity]);

  // 현재 선택된 위치
  const currentSelection = `${selectedCity} ${selectedDistrict}`;

  // 집/회사 선택 상태
  const isHomeSelected = home === currentSelection;
  const isWorkSelected = work === currentSelection;

  // 시 선택 핸들러
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // 시가 변경되면 구 선택 해제
    setSelectedDistrict('');
  };

  // 구 선택 핸들러 (선택 완료)
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);

    // 등록 모드가 아닌 경우에만 선택 완료
    if (!registerMode) {
      const newLocation = `${selectedCity} ${district}`;
      onSelectLocation(newLocation);
      onClose();
    }
  };

  // 저장 핸들러 (등록 모드)
  const handleSaveLocation = () => {
    if (!registerMode) return;

    if (registerMode === 'home') {
      setHome(currentSelection);
    } else if (registerMode === 'work') {
      setWork(currentSelection);
    }

    setRegisterMode(null);
    setShowFavorites(true); // 저장 후 즐겨찾기 목록으로 돌아감
  };

  // 즐겨찾기 위치 선택 핸들러
  const handleSavedLocationSelect = (location: string) => {
    onSelectLocation(location);
    onClose();
  };

  // 등록 모드 취소
  const handleCancelRegister = () => {
    setRegisterMode(null);
    setShowFavorites(true); // 취소 시 즐겨찾기 목록으로 돌아감
    // 취소 시 원래 위치로 복원
    setSelectedCity(currentCity);
    setSelectedDistrict(currentDistrict);
  };

  // 등록 모드 진입
  const handleEnterRegisterMode = (mode: 'home' | 'work') => {
    setRegisterMode(mode);

    // 기존 값이 있으면 해당 값으로 선택, 없으면 초기화
    const existingLocation = mode === 'home' ? home : work;
    if (existingLocation) {
      const [city, district] = existingLocation.split(' ');
      setSelectedCity(city || '');
      setSelectedDistrict(district || '');
    } else {
      setSelectedCity('');
      setSelectedDistrict('');
    }
  };

  // 삭제 핸들러
  const handleDeleteLocation = () => {
    if (registerMode === 'home') {
      clearHome();
    } else if (registerMode === 'work') {
      clearWork();
    }
    setRegisterMode(null);
    setShowFavorites(true); // 삭제 후 즐겨찾기 목록으로 돌아감
    // 원래 위치로 복원
    setSelectedCity(currentCity);
    setSelectedDistrict(currentDistrict);
  };

  // 모달 제목
  const modalTitle = registerMode === 'home'
    ? '집 설정'
    : registerMode === 'work'
    ? '회사 설정'
    : showFavorites
    ? '즐겨찾기'
    : '지역 선택';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      fixedHeight
      footer={
        registerMode ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancelRegister}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            {/* 삭제 버튼 - 기존에 등록된 위치가 있을 때만 표시 */}
            {((registerMode === 'home' && home) || (registerMode === 'work' && work)) && (
              <button
                onClick={handleDeleteLocation}
                className="px-4 py-3 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                aria-label="삭제"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleSaveLocation}
              disabled={!selectedCity || !selectedDistrict}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                selectedCity && selectedDistrict
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {!selectedCity
                ? '시/도를 선택해주세요'
                : !selectedDistrict
                ? '구/군을 선택해주세요'
                : `${selectedCity} ${selectedDistrict}로 저장`}
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-4">
        {/* 즐겨찾기 목록 뷰 */}
        {showFavorites && !registerMode && (
          <div className="space-y-2">
            {/* 뒤로가기 */}
            <button
              onClick={() => setShowFavorites(false)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">지역 선택으로 돌아가기</span>
            </button>

            {/* 집 */}
            <button
              onClick={() => home ? handleSavedLocationSelect(home) : handleEnterRegisterMode('home')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">집</p>
                  {home && <p className="text-xs text-gray-500">{home}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {home ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterRegisterMode('home');
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* 회사 */}
            <button
              onClick={() => work ? handleSavedLocationSelect(work) : handleEnterRegisterMode('work')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">회사</p>
                  {work && <p className="text-xs text-gray-500">{work}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {work ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterRegisterMode('work');
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* 지역 선택 뷰 (메인) */}
        {!showFavorites && !registerMode && (
          <>
            {/* 즐겨찾기 영역 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* 집 버튼 - 등록되어 있으면 바로 선택 가능 */}
                {home ? (
                  <button
                    onClick={() => handleSavedLocationSelect(home)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                      isHomeSelected
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">집</span>
                    {isHomeSelected && <Check className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFavorites(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">집</span>
                    <Plus className="w-4 h-4" />
                  </button>
                )}

                {/* 회사 버튼 - 등록되어 있으면 바로 선택 가능 */}
                {work ? (
                  <button
                    onClick={() => handleSavedLocationSelect(work)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                      isWorkSelected
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">회사</span>
                    {isWorkSelected && <Check className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFavorites(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">회사</span>
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 즐겨찾기 목록으로 이동 */}
              <button
                onClick={() => setShowFavorites(true)}
                className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="즐겨찾기 목록"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 시 선택 영역 */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">시/도</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* 구 선택 영역 */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                구/군{selectedCity ? ` (${selectedCity})` : ''}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {districts.map((district) => {
                  const isSelected = district === selectedDistrict;
                  return (
                    <button
                      key={district}
                      onClick={() => handleDistrictSelect(district)}
                      className={`flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      {district}
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 등록 모드 (집/회사 설정) */}
        {registerMode && (
          <>
            {/* 시 선택 영역 */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">시/도</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* 구 선택 영역 */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                구/군{selectedCity ? ` (${selectedCity})` : ''}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {districts.length === 0 ? (
                  <p className="col-span-3 text-sm text-gray-400 py-4 text-center">
                    시/도를 먼저 선택해주세요
                  </p>
                ) : (
                  districts.map((district) => {
                    const isSelected = district === selectedDistrict;
                    return (
                      <button
                        key={district}
                        onClick={() => handleDistrictSelect(district)}
                        className={`flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-green-50 text-green-600 border border-green-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        {district}
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
