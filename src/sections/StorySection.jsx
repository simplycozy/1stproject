import React from 'react';
import { Box, Typography } from '@mui/material';

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
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.setAttribute('data-section', 'StorySection');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('📖 [StorySection] Intersection:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio.toFixed(2),
            boundingClientRect: {
              top: entry.boundingClientRect.top.toFixed(0),
              bottom: entry.boundingClientRect.bottom.toFixed(0),
              left: entry.boundingClientRect.left.toFixed(0),
              right: entry.boundingClientRect.right.toFixed(0),
            },
            scrollY: window.scrollY || window.lenis?.scroll || 0,
          });
        });
      },
      { threshold: [0, 0.1, 0.5, 1.0] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
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

