import React from 'react';

/**
 * 스크롤 위치 로깅 훅
 * 
 * Props:
 * @param {boolean} enabled - 로깅 활성화 여부 [Optional, 기본값: false]
 * @param {function} onScroll - 스크롤 시 실행할 커스텀 콜백 함수 [Optional]
 * 
 * 개발 환경에서 스크롤 위치를 추적하고 디버깅하는데 사용됩니다.
 * 
 * Example usage:
 * useScrollLogger(true); // 개발환경에서 로깅 활성화
 * useScrollLogger(false, (scrollY) => console.log('Custom:', scrollY));
 */
function useScrollLogger(enabled = false, onScroll = null) {
  React.useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log('📍 ScrollY:', scrollY);
      
      // 커스텀 콜백이 있으면 실행
      if (onScroll && typeof onScroll === 'function') {
        onScroll(scrollY);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, onScroll]);
}

export default useScrollLogger; 