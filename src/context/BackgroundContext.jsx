import React, { createContext, useContext, useState, useCallback } from 'react';

const BackgroundContext = createContext();

/**
 * BackgroundProvider 컴포넌트
 * 전체 앱의 배경색 상태를 관리하고 섹션별 트랜지션을 제공
 * 우선순위 기반으로 충돌을 방지
 * 
 * Props:
 * @param {ReactNode} children - 하위 컴포넌트들 [Required]
 * 
 * Example usage:
 * <BackgroundProvider>
 *   <App />
 * </BackgroundProvider>
 */
export function BackgroundProvider({ children }) {
  const [backgroundMode, setBackgroundMode] = useState('light');
  const [activeSections, setActiveSections] = useState(new Map());
  
  // 배경색 정의
  const backgroundColors = {
    light: '#ffffff',
    dark: '#020202'
  };

  // 섹션 우선순위 정의 (숫자가 높을수록 우선순위가 높음)
  const sectionPriorities = {
    'transition': 100, // TransitionSection이 더 높은 우선순위
    'hero': 90,        // HeroSection은 낮은 우선순위
  };

  /**
   * 섹션 활성 상태 업데이트
   * @param {string} sectionId - 섹션 ID ('hero' 또는 'transition')
   * @param {boolean} isActive - 활성 상태
   */
  const updateSectionStatus = useCallback((sectionId, isActive) => {
    setActiveSections(prev => {
      const newMap = new Map(prev);
      
      if (isActive) {
        newMap.set(sectionId, Date.now()); // 활성화 시간 기록
      } else {
        newMap.delete(sectionId);
      }
      
      // 우선순위에 따라 배경 모드 결정
      let highestPriority = -1;
      let selectedMode = 'light'; // 기본값
      
      for (const [sectionId] of newMap) {
        const priority = sectionPriorities[sectionId] || 0;
        if (priority > highestPriority) {
          highestPriority = priority;
          selectedMode = sectionId === 'transition' ? 'dark' : 'light';
        }
      }
      
      
      setBackgroundMode(selectedMode);
      
      return newMap;
    });
  }, []);

  /**
   * 레거시 지원: 직접 배경 모드 업데이트 (우선순위 무시)
   * @param {string} mode - 'light' 또는 'dark'
   */
  const updateBackgroundMode = (mode) => {
    console.log('🎨 [Background] Mode Change Request:', {
      mode,
      currentMode: backgroundMode,
      activeSections: Array.from(activeSections.keys()),
      timestamp: new Date().toISOString(),
      stackTrace: new Error().stack.split('\n').slice(1, 4).join('\n')
    });
    
    if (mode === 'light' || mode === 'dark') {
      setBackgroundMode(mode);
    }
  };

  const value = {
    backgroundMode,
    updateBackgroundMode, // 레거시 지원
    updateSectionStatus,  // 새로운 우선순위 기반 메서드
    currentBackgroundColor: backgroundColors[backgroundMode],
    backgroundColors,
    activeSections: Array.from(activeSections.keys()),
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

/**
 * 배경 Context를 사용하는 커스텀 훅
 * @returns {Object} 배경 관련 상태와 함수들
 */
export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}; 