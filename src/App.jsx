import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery, Box } from '@mui/material';

// 커스텀 테마 불러오기
import { lightTheme } from './styles/theme';

// GSAP 글로벌 초기화
import { initializeGSAP, ScrollTrigger } from './utils/gsapConfig';

// 커스텀 훅 불러오기
import useLenisScroll from './hooks/useLenisScroll';
import useScrollRestoration from './hooks/useScrollRestoration';

// Context 불러오기
import { BackgroundProvider } from './context/BackgroundContext';
import { SectionRefsProvider } from './context/SectionRefsContext';

// 페이지 컴포넌트 불러오기
import LandingPage from './pages/LandingPage';
import ProjectDetail from './pages/ProjectDetail';

// 공통 컴포넌트 불러오기
import BackgroundLayer from './components/commons/BackgroundLayer';
import CustomTooltipCursor from './components/patterns/customCursor/CustomTooltipCursor';

// 스타일 파일
import './App.css';

// GSAP 플러그인 등록 (앱 시작 시 한 번만 실행)
initializeGSAP();

/**
 * App 컴포넌트
 * 
 * 튜토리얼 시작용 기본 애플리케이션 구조
 * 
 * 기능:
 * - GSAP 플러그인 전역 초기화
 * - Lenis 부드러운 스크롤 전역 활성화
 * - GSAP ScrollTrigger 연동
 * - 전역 배경색 관리 시스템
 * - CustomTooltipCursor 커스텀 커서 시스템 (데스크탑만)
 * - Header 상단 고정 네비게이션
 * - SectionRefsContext 섹션 이동 기능
 * - 튜토리얼용 기본 환영 메시지
 */
function App() {
  const theme = lightTheme;
  
  // 모바일 버전 감지 (md 브레이크포인트 이하)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // 브라우저 자동 스크롤 복원 비활성화
  useScrollRestoration();
  
  // Lenis 부드러운 스크롤 활성화 (GSAP ScrollTrigger 연동)
  const lenisRef = useLenisScroll(true, {
    integrateGSAP: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // 스크롤 위치 및 섹션 전환 추적
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // 스크롤 위치 추적 및 진동 감지
    let lastScrollY = null;
    let scrollChangeCount = 0;
    let scrollLogThrottle = 0;
    const scrollHistory = [];
    
    const handleScroll = () => {
      const scrollY = lenis.scroll || window.scrollY;
      
      // 스크롤 진동 감지
      if (lastScrollY !== null) {
        const diff = Math.abs(scrollY - lastScrollY);
        scrollHistory.push({ scrollY, diff, timestamp: Date.now() });
        if (scrollHistory.length > 10) scrollHistory.shift();
        
        // 작은 변화가 반복되면 진동으로 판단
        if (diff < 5 && diff > 0) {
          scrollChangeCount++;
          if (scrollChangeCount > 5) {
            console.warn('⚠️ [Scroll Oscillation] 스크롤이 진동하고 있습니다:', {
              current: scrollY.toFixed(0),
              previous: lastScrollY.toFixed(0),
              diff: diff.toFixed(2),
              count: scrollChangeCount,
              history: scrollHistory.slice(-5).map(h => ({
                y: h.scrollY.toFixed(0),
                diff: h.diff.toFixed(2)
              }))
            });
          }
        } else {
          scrollChangeCount = 0;
        }
      }
      lastScrollY = scrollY;
      
      // 로그는 20프레임마다만 출력 (빈도 줄이기)
      if (scrollLogThrottle++ % 20 !== 0) {
        return;
      }
      
      const heroSection = document.querySelector('[data-section="HeroSection"]');
      const transitionSection = document.querySelector('[data-section="TransitionSection"]');
      const storySection = document.querySelector('[data-section="StorySection"]');
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        console.log('📍 [Scroll Debug] HeroSection:', {
          scrollY: scrollY.toFixed(0),
          heroTop: heroRect.top.toFixed(0),
          heroBottom: heroRect.bottom.toFixed(0),
          heroInView: heroRect.top < window.innerHeight && heroRect.bottom > 0,
        });
      }
      
      if (transitionSection) {
        const transitionRect = transitionSection.getBoundingClientRect();
        console.log('📍 [Scroll Debug] TransitionSection:', {
          scrollY: scrollY.toFixed(0),
          transitionLeft: transitionRect.left.toFixed(0),
          transitionRight: transitionRect.right.toFixed(0),
          transitionInView: transitionRect.left < window.innerWidth && transitionRect.right > 0,
        });
      }
      
      if (storySection) {
        const storyRect = storySection.getBoundingClientRect();
        console.log('📍 [Scroll Debug] StorySection:', {
          scrollY: scrollY.toFixed(0),
          storyTop: storyRect.top.toFixed(0),
          storyBottom: storyRect.bottom.toFixed(0),
          storyInView: storyRect.top < window.innerHeight && storyRect.bottom > 0,
        });
      }
    };

    lenis.on('scroll', handleScroll);

    let lastScrollDiff = 0;
    let lastPinnedCount = 0;

    // 스크롤 충돌 확인을 위한 모니터링
    const checkScrollConflict = () => {
      const activeTriggers = ScrollTrigger.getAll();
      const lenisScroll = lenis.scroll || window.scrollY;
      const nativeScroll = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = Math.abs(lenisScroll - nativeScroll);

      // 스크롤 값이 크게 차이나면 충돌 가능성 (변경사항이 있을 때만)
      if (scrollDiff > 10 && Math.abs(scrollDiff - lastScrollDiff) > 5) {
        console.warn('⚠️ [Scroll Conflict] Lenis와 네이티브 스크롤 불일치:', {
          lenisScroll,
          nativeScroll,
          diff: scrollDiff,
          activeTriggers: activeTriggers.length,
          scroller: activeTriggers[0]?.scroller === window ? 'window' : (activeTriggers[0]?.scroller?.className || 'custom')
        });
        lastScrollDiff = scrollDiff;
      }
    };

    // ScrollTrigger 상태 모니터링 (변경사항이 있을 때만)
    const logScrollTriggerStatus = () => {
      const triggers = ScrollTrigger.getAll();
      const pinnedTriggers = triggers.filter(t => t.isActive && t.vars.pin);
      
      // pinned 트리거 개수가 변경되었을 때만 로그 출력
      if (pinnedTriggers.length !== lastPinnedCount) {
        console.log('📌 [ScrollMonitor] Pinned ScrollTrigger 상태 변경:', {
          count: pinnedTriggers.length,
          previousCount: lastPinnedCount,
          triggers: pinnedTriggers.map(t => ({
            id: t.vars.id || 'unnamed',
            progress: t.progress.toFixed(2),
            scroller: t.scroller === window ? 'window' : (t.scroller?.className || 'custom'),
            scrollerType: t.scroller === window ? 'native' : (window.lenis ? 'lenis' : 'custom')
          }))
        });
        lastPinnedCount = pinnedTriggers.length;
      }
    };

    // 주기적으로 확인 (10초마다 - 빈도 줄임)
    const interval = setInterval(() => {
      checkScrollConflict();
      logScrollTriggerStatus();
    }, 10000);

    // 초기 확인
    checkScrollConflict();
    logScrollTriggerStatus();

    return () => {
      lenis.off('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [lenisRef]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <BackgroundProvider>
          <SectionRefsProvider>
            {/* 전역 배경 레이어 */}
            <BackgroundLayer />
            
            {/* 커스텀 커서 - 데스크탑에서만 활성화 */}
            {!isMobile && (
              <CustomTooltipCursor 
                size={40}
                borderWidth={3}
                lag={0.15}
              />
            )}
            
            {/* 메인 콘텐츠 영역 */}
            <Box
              component="main"
              sx={{
                minHeight: '100vh',
                pt: 0,
              }}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Routes>
            </Box>
          </SectionRefsProvider>
        </BackgroundProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
