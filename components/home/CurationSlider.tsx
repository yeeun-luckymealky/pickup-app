'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Curation } from '@/types/store';
import curationsData from '@/data/curations.json';

const curations: Curation[] = curationsData as Curation[];

export default function CurationSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = curations.length;

  // 슬라이드 이동 함수
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  }, [currentIndex, totalSlides, scrollToIndex]);

  // 자동 슬라이드 설정
  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // 스크롤 이벤트로 현재 인덱스 감지
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, totalSlides]);

  // 터치/드래그 시 자동 슬라이드 일시 정지
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    // 2초 후 자동 슬라이드 재개
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // 인디케이터 클릭 핸들러
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    scrollToIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div className="py-3">
      {/* 슬라이더 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {curations.map((curation) => (
          <Link
            key={curation.id}
            href={`/search?theme=${curation.id}`}
            className="flex-shrink-0 w-full snap-center px-4"
          >
            <div
              className={`relative h-28 rounded-2xl bg-gradient-to-r ${curation.bgColor} p-4 flex items-center justify-between overflow-hidden`}
            >
              {/* 텍스트 영역 */}
              <div className="z-10">
                <h3 className="text-lg font-bold text-gray-900">
                  {curation.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {curation.subtitle}
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-white/70 px-2 py-1 rounded-full">
                  지금 확인하기
                </span>
              </div>

              {/* 이모지 영역 */}
              <div className="text-6xl opacity-90 transform -rotate-12">
                {curation.emoji}
              </div>

              {/* 배경 장식 */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full" />
            </div>
          </Link>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-1.5 mt-3">
        {curations.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-green-500 w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
