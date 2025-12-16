import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import useIsInView from '../hooks/useIsInView';
import { devLog } from '../utils/logger';

/**
 * StorySection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <StorySection />
 */
function StorySection() {
  const [ref, isInView] = useIsInView({ threshold: 0.3, triggerOnce: false });
  const isFirstRender = useRef(true);

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'StorySection');
    }
  }, [ref]);

  useEffect(() => {
    // 첫 렌더링은 건너뜀 (초기 false 상태 로깅 방지)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    devLog('📖 [StorySection] isInView changed:', {
      isInView,
      scrollY: window.scrollY || window.lenis?.scroll || 0,
    });
  }, [isInView]);

  return (
    <Box
      ref={ref}
      component="section"
      data-section="StorySection"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        px: { xs: 3, md: 6 },
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
        Story Section
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 640, opacity: 0.8 }}>
        브랜드 스토리를 담을 영역입니다. 이후 콘텐츠와 시각 요소를 채워주세요.
      </Typography>
    </Box>
  );
}

export default StorySection;

