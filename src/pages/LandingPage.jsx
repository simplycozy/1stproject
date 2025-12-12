import React from 'react';
import { Box } from '@mui/material';
import { useBackground } from '../context/BackgroundContext';
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
 */
function LandingPage() {
  const { backgroundMode } = useBackground();
  const textColor = backgroundMode === 'light' ? '#000000' : '#ffffff';

  return (
    <Box component="main" sx={{ color: textColor }}>
      <TopSection />
      <StorySection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default LandingPage;

