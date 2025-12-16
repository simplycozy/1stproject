import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { devLog } from '../utils/logger';

const BackgroundContext = createContext();

// 상수는 컴포넌트 외부에 정의 (매 렌더링마다 재생성 방지)
const BACKGROUND_COLORS = {
  light: '#ffffff',
  dark: '#020202'
};

// 섹션 우선순위 정의 (숫자가 높을수록 우선순위가 높음)
const SECTION_PRIORITIES = {
  'transition': 100, // TransitionSection이 더 높은 우선순위
  'hero': 90,        // HeroSection은 낮은 우선순위
};

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
        const priority = SECTION_PRIORITIES[sectionId] || 0;
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
   * useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
   * @param {string} mode - 'light' 또는 'dark'
   */
  const updateBackgroundMode = useCallback((mode) => {
    if (mode === 'light' || mode === 'dark') {
      setBackgroundMode((currentMode) => {
        if (currentMode !== mode) {
          devLog('🎨 [Background] Mode Change:', { from: currentMode, to: mode });
        }
        return mode;
      });
    }
  }, []);

  // activeSections 배열을 별도로 메모이제이션
  const activeSectionKeys = useMemo(
    () => Array.from(activeSections.keys()),
    [activeSections]
  );

  // value 객체를 useMemo로 메모이제이션하여 불필요한 리렌더링 방지
  const value = useMemo(() => ({
    backgroundMode,
    updateBackgroundMode,
    updateSectionStatus,
    currentBackgroundColor: BACKGROUND_COLORS[backgroundMode],
    backgroundColors: BACKGROUND_COLORS,
    activeSections: activeSectionKeys,
  }), [backgroundMode, updateBackgroundMode, updateSectionStatus, activeSectionKeys]);

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