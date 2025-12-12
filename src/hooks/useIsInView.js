import { useState, useEffect, useRef } from 'react';

/**
 * 실제 뷰포트 감지 커스텀 훅
 * 가로축과 세로축 모두를 고려하여 요소가 실제로 화면에 보이는지 감지합니다.
 * 
 * @param {Object} options - 설정 객체
 * @param {number} options.threshold - 감지 임계값 (0~1, 기본값: 0.3)
 * @param {string} options.rootMargin - 루트 마진 (기본값: '0px')
 * @param {boolean} options.triggerOnce - 한 번만 트리거할지 여부 (기본값: true)
 * @returns {Array} [ref, isInView] - 요소 ref와 뷰포트 내 여부
 */
function useIsInView(options = {}) {
  const {
    threshold = 0.3,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;
  
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 기존 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 🔧 개선된 실제 뷰포트 감지 함수
    const checkRealViewport = (entry) => {
      const { boundingClientRect, intersectionRatio } = entry;
      const { left, right, top, bottom, width, height } = boundingClientRect;
      
      // 윈도우 크기
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // 🎯 가로축 가시성을 더 정확히 계산
      const visibleWidth = Math.min(right, windowWidth) - Math.max(left, 0);
      const horizontalVisibilityRatio = Math.max(0, visibleWidth) / width;
      
      // 🎯 세로축 가시성을 더 정확히 계산  
      const visibleHeight = Math.min(bottom, windowHeight) - Math.max(top, 0);
      const verticalVisibilityRatio = Math.max(0, visibleHeight) / height;
      
      // 🎯 최소 가시성 비율 설정 (threshold 값에 맞게 동적으로 설정)
      const minVisibilityRatio = Math.min(threshold, 0.3); // threshold와 0.3 중 작은 값 사용
      const isInViewHorizontally = horizontalVisibilityRatio >= minVisibilityRatio;
      const isInViewVertically = verticalVisibilityRatio >= minVisibilityRatio;
      
      // threshold 체크 (기본 Intersection Observer 결과 활용)
      const meetsThreshold = intersectionRatio >= threshold;
      
      // 🔍 디버깅 로그 (isInView 상태가 변경될 때만 출력)
      // 실제 로그는 observer 콜백에서 처리
      
      // 모든 조건을 만족해야 실제 뷰포트 안에 있음
      const isReallyInView = isInViewHorizontally && isInViewVertically && meetsThreshold;
      
      return isReallyInView;
    };

    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const reallyInView = checkRealViewport(entry);
          const sectionName = element.getAttribute('data-section') || 'Unknown';
          const wasInView = isInView;
          
          // 상태가 변경될 때만 로그 출력
          if (reallyInView !== wasInView) {
            const { boundingClientRect } = entry;
            console.log(`🔍 [${sectionName}] Viewport State Changed:`, {
              isInView: reallyInView,
              wasInView,
              horizontalVisibilityRatio: (Math.min(boundingClientRect.right, window.innerWidth) - Math.max(boundingClientRect.left, 0)) / boundingClientRect.width,
              verticalVisibilityRatio: (Math.min(boundingClientRect.bottom, window.innerHeight) - Math.max(boundingClientRect.top, 0)) / boundingClientRect.height,
              intersectionRatio: entry.intersectionRatio.toFixed(2),
              bounds: { 
                left: boundingClientRect.left.toFixed(0), 
                right: boundingClientRect.right.toFixed(0), 
                top: boundingClientRect.top.toFixed(0),
                bottom: boundingClientRect.bottom.toFixed(0),
              },
              scrollY: window.scrollY || window.lenis?.scroll || 0
            });
          }
          
          if (reallyInView && (!triggerOnce || !hasTriggered)) {
            setIsInView(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          } else if (!triggerOnce && !reallyInView) {
            setIsInView(false);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // 🔧 더 세밀한 threshold 배열
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, isInView];
}

export default useIsInView; 