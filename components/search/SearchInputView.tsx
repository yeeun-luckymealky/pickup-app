'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Clock, MapPin, Store, UtensilsCrossed } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useSearchHistoryStore } from '@/store/useSearchHistoryStore';
import { highlightText } from '@/utils/highlight';
import storesData from '@/data/stores.json';
import { CATEGORIES } from '@/data/categories';
import type { Store as StoreType } from '@/types/store';

interface SearchInputViewProps {
  onClose: () => void;
}

interface SearchResults {
  locations: { address: string; storeCount: number }[];
  stores: StoreType[];
  menus: { store: StoreType; menuName: string }[];
}

export default function SearchInputView({ onClose }: SearchInputViewProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useFilterStore();
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistoryStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [submittedQuery, setSubmittedQuery] = useState('');

  const stores: StoreType[] = storesData as StoreType[];

  // 검색 버튼을 눌렀을 때만 결과 표시
  const searchResults = useMemo<SearchResults>(() => {
    const query = submittedQuery.trim().toLowerCase();
    if (!query) {
      return { locations: [], stores: [], menus: [] };
    }

    // 지역으로 찾기 - 주소에서 매칭되는 것들 (중복 제거)
    const addressMap = new Map<string, number>();
    stores.forEach((store) => {
      if (store.address.toLowerCase().includes(query)) {
        // 동 단위로 그룹화
        const count = addressMap.get(store.address) || 0;
        addressMap.set(store.address, count + 1);
      }
    });
    const locations = Array.from(addressMap.entries()).map(([address, storeCount]) => ({
      address,
      storeCount,
    }));

    // 가게명으로 찾기
    const matchingStores = stores.filter((store) =>
      store.name.toLowerCase().includes(query)
    );

    // 메뉴로 찾기
    const menus: { store: StoreType; menuName: string }[] = [];
    stores.forEach((store) => {
      store.menuItems.forEach((menu) => {
        if (menu.name.toLowerCase().includes(query)) {
          menus.push({ store, menuName: menu.name });
        }
      });
    });

    return { locations, stores: matchingStores, menus };
  }, [submittedQuery, stores]);

  const hasResults = searchResults.locations.length > 0 ||
                     searchResults.stores.length > 0 ||
                     searchResults.menus.length > 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        addSearch(inputValue.trim());
        setSubmittedQuery(inputValue.trim());
      }
    },
    [inputValue, addSearch]
  );

  // 지역 선택 시: 지도뷰로 돌아가서 검색 결과 표시
  const handleSelectLocation = useCallback(
    (query: string) => {
      addSearch(query);
      setSearchQuery(query);
      onClose();
    },
    [setSearchQuery, addSearch, onClose]
  );

  // 가게/메뉴 선택 시: 가게 상세 페이지로 이동
  const handleSelectStore = useCallback(
    (storeId: string, query: string) => {
      addSearch(query);
      router.push(`/store/${storeId}`);
    },
    [addSearch, router]
  );

  // 최근 검색어/카테고리 선택 시: 지도뷰로 돌아가서 검색
  const handleSelectQuery = useCallback(
    (query: string) => {
      addSearch(query);
      setSearchQuery(query);
      onClose();
    },
    [setSearchQuery, addSearch, onClose]
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <form onSubmit={handleSubmit} className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="지역, 가게명, 메뉴 검색"
                className="w-full h-12 pl-4 pr-12 bg-white border-2 border-green-500 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none transition-colors"
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setSubmittedQuery('');
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 검색 버튼을 눌렀을 때: 카테고리별 검색 결과 */}
        {submittedQuery ? (
          <div className="py-2">
            {!hasResults ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Search className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-lg font-medium">검색 결과가 없습니다</p>
                <p className="text-sm mt-1">다른 키워드로 검색해 보세요</p>
              </div>
            ) : (
              <>
                {/* 지역으로 찾았어요 */}
                {searchResults.locations.length > 0 && (
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      지역으로 찾았어요
                    </h3>
                    <div className="space-y-1">
                      {searchResults.locations.map((location) => (
                        <button
                          key={location.address}
                          onClick={() => handleSelectLocation(location.address)}
                          className="flex items-center justify-between w-full py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg text-left"
                        >
                          <span className="text-sm text-gray-700">
                            {highlightText(location.address, submittedQuery)}
                          </span>
                          <span className="text-xs text-gray-400">
                            근처 럭키백 찾기 &gt;
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 가게명으로 찾았어요 */}
                {searchResults.stores.length > 0 && (
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5" />
                      가게명으로 찾았어요
                    </h3>
                    <div className="space-y-1">
                      {searchResults.stores.map((store) => (
                        <button
                          key={store.id}
                          onClick={() => handleSelectStore(store.id, store.name)}
                          className="flex items-center justify-between w-full py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg text-left"
                        >
                          <div>
                            <span className="text-sm text-gray-700">
                              {highlightText(store.name, submittedQuery)}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              {store.address}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 메뉴로 찾았어요 */}
                {searchResults.menus.length > 0 && (
                  <div className="px-4 py-3">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      메뉴로 찾았어요
                    </h3>
                    <div className="space-y-1">
                      {searchResults.menus.slice(0, 10).map((item, index) => (
                        <button
                          key={`${item.store.id}-${item.menuName}-${index}`}
                          onClick={() => handleSelectStore(item.store.id, item.menuName)}
                          className="flex items-center justify-between w-full py-2.5 px-2 -mx-2 hover:bg-gray-50 rounded-lg text-left"
                        >
                          <div>
                            <span className="text-sm text-gray-700">
                              {highlightText(item.store.name, submittedQuery)}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              {highlightText(item.menuName, submittedQuery)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {/* 최근 검색어 */}
            <div className="px-4 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">최근 검색어</h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    전체 삭제
                  </button>
                )}
              </div>
              {history.length > 0 ? (
                <div className="space-y-1">
                  {history.map((query) => (
                    <div
                      key={query}
                      className="flex items-center justify-between py-2.5 hover:bg-gray-50 rounded-lg px-2 -mx-2"
                    >
                      <button
                        onClick={() => handleSelectQuery(query)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{query}</span>
                      </button>
                      <button
                        onClick={() => removeSearch(query)}
                        className="p-1.5 hover:bg-gray-200 rounded-full"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 py-2">최근 검색어가 없습니다</p>
              )}
            </div>

            {/* Categories */}
            <div className="px-4 py-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">럭키백 카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelectQuery(category)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
