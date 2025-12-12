import { useState, useEffect, useRef, useContext, createContext } from 'react';

// 동적 테마 컨텍스트 생성
const DynamicThemeContext = createContext({
  currentTheme: 'light',
  changeTheme: () => {},
  isTransitioning: false,
  activeSections: new Set(),
});

/**
 * 동적 테마 프로바이더
 * 전역 테마 상태를 관리하고 자식 컴포넌트들에게 제공
 */
export function DynamicThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSections, setActiveSections] = useState(new Set());
  const themeChangeTimeoutRef = useRef(null);

  /**
   * 테마 변경 함수
   * @param {string} newTheme - 새로운 테마 ('light' | 'dark')
   * @param {string} sectionId - 섹션 식별자
   * @param {number} duration - 트랜지션 지속 시간 (ms)
   */
  const changeTheme = (newTheme, sectionId, duration = 300) => {
    // 섹션 활성화 상태 업데이트
    setActiveSections(prev => new Set([...prev, sectionId]));

    // 현재 테마와 같으면 트랜지션 없이 return
    if (newTheme === currentTheme && !isTransitioning) {
      return;
    }

    // 이전 타이머 취소
    if (themeChangeTimeoutRef.current) {
      clearTimeout(themeChangeTimeoutRef.current);
    }

    // 트랜지션 시작
    setIsTransitioning(true);

    // 즉시 테마 변경 (CSS transition이 처리)
    setCurrentTheme(newTheme);

    // 트랜지션 완료 후 상태 정리
    themeChangeTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, duration);

    console.log(`🎨 Theme changed to: ${newTheme} by section: ${sectionId}`);
  };

  /**
   * 섹션 비활성화 함수
   * @param {string} sectionId - 섹션 식별자
   */
  const deactivateSection = (sectionId) => {
    setActiveSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (themeChangeTimeoutRef.current) {
        clearTimeout(themeChangeTimeoutRef.current);
      }
    };
  }, []);

  const value = {
    currentTheme,
    changeTheme,
    deactivateSection,
    isTransitioning,
    activeSections,
  };

  return (
    <DynamicThemeContext.Provider value={value}>
      {children}
    </DynamicThemeContext.Provider>
  );
}

/**
 * 동적 테마 훅
 * 컴포넌트에서 테마 상태와 변경 함수를 사용하기 위한 훅
 * 
 * @returns {Object} 테마 상태와 제어 함수들
 */
export function useDynamicTheme() {
  const context = useContext(DynamicThemeContext);
  
  if (!context) {
    throw new Error('useDynamicTheme must be used within a DynamicThemeProvider');
  }
  
  return context;
}

/**
 * 섹션별 테마 변경 훅
 * useIsInView와 연동하여 섹션 진입시 자동으로 테마를 변경
 * 
 * @param {string} sectionId - 섹션 고유 식별자
 * @param {string} themeMode - 섹션의 테마 ('light' | 'dark')
 * @param {Object} options - 추가 옵션
 * @param {number} options.threshold - 뷰포트 감지 임계값
 * @param {boolean} options.triggerOnce - 한 번만 트리거할지 여부
 * @param {number} options.transitionDuration - 트랜지션 지속 시간
 * 
 * @returns {Array} [ref, isInView] - useIsInView와 동일한 반환값
 */
export function useSectionTheme(sectionId, themeMode, options = {}) {
  const { 
    threshold = 0.5, // 50% 이상 보일 때 트리거
    triggerOnce = false, 
    transitionDuration = 300 
  } = options;
  
  const { changeTheme, deactivateSection } = useDynamicTheme();
  const [ref, setRef] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!ref) return;

    // 기존 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio >= threshold;
          
          if (inView && (!triggerOnce || !hasTriggeredRef.current)) {
            setIsInView(true);
            changeTheme(themeMode, sectionId, transitionDuration);
            
            if (triggerOnce) {
              hasTriggeredRef.current = true;
            }
          } else if (!triggerOnce && !inView) {
            setIsInView(false);
            deactivateSection(sectionId);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px',
      }
    );

    observerRef.current.observe(ref);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, sectionId, themeMode, threshold, triggerOnce, transitionDuration, changeTheme, deactivateSection]);

  return [setRef, isInView];
}

export default useDynamicTheme; 