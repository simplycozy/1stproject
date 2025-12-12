import { useLayoutEffect } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollHandler 컴포넌트
 * React Router와 GSAP ScrollTrigger 충돌 해결
 */
function ScrollHandler() {
  const location = useLocation();

  useLayoutEffect(() => {
    // ScrollTrigger 메모리 정리만
    ScrollTrigger.clearScrollMemory('manual');
    
    // DOM 업데이트 후 갱신만
    setTimeout(() => ScrollTrigger.refresh(), 100);
    
  }, [location.pathname]);

  return null;
}

export default ScrollHandler; 