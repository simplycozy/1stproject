import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery, Box } from '@mui/material';

// 커스텀 테마 불러오기
import { lightTheme } from './styles/theme';

// GSAP 글로벌 초기화
import { initializeGSAP } from './utils/gsapConfig';

// 커스텀 훅 불러오기
import useLenisScroll from './hooks/useLenisScroll';
import useScrollRestoration from './hooks/useScrollRestoration';
import useScrollMonitor from './hooks/useScrollMonitor';

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

  // 전역 스크롤 모니터링 (Lenis/ScrollTrigger 충돌 감지)
  useScrollMonitor(lenisRef, {
    enabled: process.env.NODE_ENV === 'development',
    intervalMs: 10000,
    conflictThreshold: 10,
  });

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
