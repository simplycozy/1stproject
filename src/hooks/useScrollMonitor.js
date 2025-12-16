import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../utils/gsapConfig';
import { devLog, devWarn } from '../utils/logger';

/**
 * 전역 스크롤 모니터링 훅
 * Lenis와 ScrollTrigger 간의 충돌을 감지하고 모니터링
 *
 * @param {React.MutableRefObject} lenisRef - Lenis 인스턴스 ref
 * @param {Object} options - 설정 옵션
 * @param {boolean} options.enabled - 모니터링 활성화 여부 (기본값: true)
 * @param {number} options.intervalMs - 체크 간격 밀리초 (기본값: 10000)
 * @param {number} options.conflictThreshold - 충돌 감지 임계값 (기본값: 10)
 */
function useScrollMonitor(lenisRef, options = {}) {
  const {
    enabled = true,
    intervalMs = 10000,
    conflictThreshold = 10,
  } = options;

  const lastScrollDiffRef = useRef(0);
  const lastPinnedCountRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const lenis = lenisRef.current;
    if (!lenis) return;

    /**
     * Lenis와 네이티브 스크롤 충돌 감지
     */
    const checkScrollConflict = () => {
      const lenisScroll = lenis.scroll || window.scrollY;
      const nativeScroll = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = Math.abs(lenisScroll - nativeScroll);

      if (scrollDiff > conflictThreshold && Math.abs(scrollDiff - lastScrollDiffRef.current) > 5) {
        const activeTriggers = ScrollTrigger.getAll();
        devWarn('⚠️ [Scroll Conflict] Lenis와 네이티브 스크롤 불일치:', {
          lenisScroll,
          nativeScroll,
          diff: scrollDiff,
          activeTriggers: activeTriggers.length,
          scroller: activeTriggers[0]?.scroller === window
            ? 'window'
            : (activeTriggers[0]?.scroller?.className || 'custom')
        });
        lastScrollDiffRef.current = scrollDiff;
      }
    };

    /**
     * ScrollTrigger 핀 상태 모니터링
     */
    const logScrollTriggerStatus = () => {
      const triggers = ScrollTrigger.getAll();
      const pinnedTriggers = triggers.filter(t => t.isActive && t.vars.pin);

      if (pinnedTriggers.length !== lastPinnedCountRef.current) {
        devLog('📌 [ScrollMonitor] Pinned ScrollTrigger 상태 변경:', {
          count: pinnedTriggers.length,
          previousCount: lastPinnedCountRef.current,
          triggers: pinnedTriggers.map(t => ({
            id: t.vars.id || 'unnamed',
            progress: t.progress.toFixed(2),
            scroller: t.scroller === window ? 'window' : (t.scroller?.className || 'custom'),
            scrollerType: t.scroller === window ? 'native' : (window.lenis ? 'lenis' : 'custom')
          }))
        });
        lastPinnedCountRef.current = pinnedTriggers.length;
      }
    };

    // 초기 확인
    checkScrollConflict();
    logScrollTriggerStatus();

    // 주기적으로 확인
    const interval = setInterval(() => {
      checkScrollConflict();
      logScrollTriggerStatus();
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [lenisRef, enabled, intervalMs, conflictThreshold]);
}

export default useScrollMonitor;
