import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useBackground } from '../../context/BackgroundContext';

// 테마별 텍스트 색상 매핑
const TEXT_COLORS = {
  light: '#000000',
  dark: '#ffffff',
};

/**
 * BackgroundLayer 컴포넌트
 * 전체 화면에 고정된 배경 레이어로 섹션에 따른 배경색 트랜지션을 제공
 * CSS 커스텀 프로퍼티를 통해 텍스트 색상도 전역으로 제공 (리렌더링 방지)
 *
 * Example usage:
 * <BackgroundLayer />
 */
function BackgroundLayer() {
  const { currentBackgroundColor, backgroundMode } = useBackground();

  // CSS 커스텀 프로퍼티로 텍스트 색상 설정 (React 리렌더링 없이 색상 변경)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-text-color', TEXT_COLORS[backgroundMode]);
    root.style.setProperty('--theme-bg-color', currentBackgroundColor);
  }, [backgroundMode, currentBackgroundColor]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: currentBackgroundColor,
        zIndex: -1000, // 모든 콘텐츠 뒤에 배치
        transition: 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)', // 부드러운 트랜지션
        pointerEvents: 'none', // 마우스 이벤트 차단
      }}
    />
  );
}

export default BackgroundLayer; 