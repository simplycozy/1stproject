import React from 'react';
import { Box } from '@mui/material';
import TopSection from '../sections/TopSection';
import StorySection from '../sections/StorySection';
import ProjectsSection from '../sections/ProjectsSection';
import ContactSection from '../sections/ContactSection';

/**
 * LandingPage
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <LandingPage />
 *
 * Note: 텍스트 색상은 CSS 커스텀 프로퍼티(--theme-text-color)를 통해
 * BackgroundLayer에서 설정됨 (React 리렌더링 없이 색상 전환)
 */
function LandingPage() {
  return (
    <Box
      component="main"
      sx={{
        color: 'var(--theme-text-color, #000000)',
        transition: 'color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <TopSection />
      <StorySection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default LandingPage;

