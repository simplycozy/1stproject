import React from 'react';
import { Box } from '@mui/material';
import FreeHorizontalScrollSection from '../components/patterns/scroll/FreeHorizontalScrollSection';
import HeroSection from './top/HeroSection';
import TransitionSection from './top/TransitionSection';
import MissionSection from './top/MissionSection';

/**
 * TopSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <TopSection />
 */
function TopSection() {
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: '100vh' }}>
      <FreeHorizontalScrollSection height="100vh">
        <HeroSection />
        <TransitionSection />
        <MissionSection />
      </FreeHorizontalScrollSection>
    </Box>
  );
}

export default TopSection;

