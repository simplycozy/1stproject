import React, { createContext, useContext, useRef } from 'react';

/**
 * 섹션 Ref 관리 Context
 * 각 섹션의 ref를 중앙에서 관리하여 Header에서 스크롤 이동에 활용
 */
const SectionRefsContext = createContext();

/**
 * SectionRefsProvider 컴포넌트
 * 
 * @param {React.ReactNode} children - 자식 컴포넌트들
 */
export const SectionRefsProvider = ({ children }) => {
  // 각 섹션별 ref 생성
  const topSectionRef = useRef(null);
  const storySectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  /**
   * 특정 섹션으로 부드럽게 스크롤 이동
   * @param {string} sectionName - 이동할 섹션 이름 ('top', 'story', 'projects', 'contact')
   */
  const scrollToSection = (sectionName) => {
    const refs = {
      top: topSectionRef,
      story: storySectionRef,
      projects: projectsSectionRef,
      contact: contactSectionRef,
    };

    const targetRef = refs[sectionName];
    
    if (targetRef?.current) {
      console.log(`🎯 [SectionRefs] ${sectionName} 섹션으로 스크롤 이동`);
      
      // Lenis 부드러운 스크롤 사용 (가능한 경우)
      if (window.lenis) {
        const targetTop = targetRef.current.getBoundingClientRect().top + 
                         (window.pageYOffset || document.documentElement.scrollTop);
        
        // 헤더 높이만큼 여백 추가 (약 80px)
        const offsetTop = targetTop - 80;
        
        window.lenis.scrollTo(offsetTop, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // 기본 스크롤 동작
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      console.warn(`⚠️ [SectionRefs] ${sectionName} 섹션 ref를 찾을 수 없습니다`);
    }
  };

  const contextValue = {
    // Refs
    topSectionRef,
    storySectionRef,
    projectsSectionRef,
    contactSectionRef,
    
    // 스크롤 이동 함수
    scrollToSection,
  };

  return (
    <SectionRefsContext.Provider value={contextValue}>
      {children}
    </SectionRefsContext.Provider>
  );
};

/**
 * SectionRefs Context를 사용하는 Hook
 * @returns {object} 섹션 ref들과 스크롤 이동 함수
 */
export const useSectionRefs = () => {
  const context = useContext(SectionRefsContext);
  
  if (!context) {
    throw new Error('useSectionRefs는 SectionRefsProvider 내에서 사용되어야 합니다');
  }
  
  return context;
}; 