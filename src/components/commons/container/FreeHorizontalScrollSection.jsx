import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * FreeHorizontalScrollSection 컴포넌트
 * 
 * 자유로운 가로 스크롤을 지원하는 컨테이너
 * GSAP ScrollTrigger를 사용하여 세로 스크롤을 가로 스크롤로 변환
 * 
 * Props:
 * @param {React.ReactNode} children - 가로로 배치될 자식 요소들 [Required]
 * @param {string} height - 컨테이너 높이 [Optional, 기본값: '100vh']
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 * 
 * Example usage:
 * <FreeHorizontalScrollSection height="100vh">
 *   <HeroSection />
 *   <TransitionSection />
 *   <MissionSection />
 * </FreeHorizontalScrollSection>
 */
function FreeHorizontalScrollSection({ children, height = '100vh', sx = {} }) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;

    // 자식 요소들의 총 너비 계산
    const getScrollerWidth = () => {
      let totalWidth = 0;
      Array.from(scroller.children).forEach(child => {
        totalWidth += child.offsetWidth;
      });
      return totalWidth;
    };

    // ScrollTrigger 설정
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${getScrollerWidth() - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      animation: gsap.to(scroller, {
        x: () => -(getScrollerWidth() - window.innerWidth),
        ease: 'none',
      }),
      invalidateOnRefresh: true,
    });

    // 리사이즈 이벤트 핸들러
    const handleResize = () => {
      scrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTrigger.kill();
    };
  }, [children]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height,
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        ref={scrollerRef}
        sx={{
          display: 'flex',
          height: '100%',
          width: 'fit-content',
          willChange: 'transform',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default FreeHorizontalScrollSection; 