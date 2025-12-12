import React from 'react';
import { Box } from '@mui/material';
import { useBackground } from '../../context/BackgroundContext';

/**
 * BackgroundLayer 컴포넌트
 * 전체 화면에 고정된 배경 레이어로 섹션에 따른 배경색 트랜지션을 제공
 * 
 * Example usage:
 * <BackgroundLayer />
 */
function BackgroundLayer() {
  const { currentBackgroundColor } = useBackground();

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