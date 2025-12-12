import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ParallaxContainer 컴포넌트
 * 
 * 다층 패럴랙스 효과를 위한 컨테이너
 * 자식 ParallaxLayer들의 depthZ 값에 따라 서로 다른 속도로 스크롤
 * 
 * Props:
 * @param {React.ReactNode} children - ParallaxLayer 컴포넌트들 [Required]
 * @param {number} maxZ - 최대 깊이 레벨 (높을수록 더 많은 층) [Optional, 기본값: 8]
 * @param {string} height - 컨테이너 높이 [Optional, 기본값: '200vh']
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 * 
 * Example usage:
 * <ParallaxContainer maxZ={8} height="300vh">
 *   <ParallaxLayer depthZ={1}>배경 요소</ParallaxLayer>
 *   <ParallaxLayer depthZ={4}>중간 요소</ParallaxLayer>
 *   <ParallaxLayer depthZ={8}>전경 요소</ParallaxLayer>
 * </ParallaxContainer>
 */
function ParallaxContainer({ children, maxZ = 8, height = '200vh', sx = {} }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const layers = container.querySelectorAll('[data-parallax-layer]');

    // 각 레이어에 대해 패럴랙스 효과 적용
    layers.forEach((layer) => {
      const depthZ = parseInt(layer.getAttribute('data-depth-z') || '1');
      
      // depthZ 값이 높을수록 느리게 움직임 (원근감 효과)
      const speed = 1 - (depthZ / maxZ) * 0.8; // 0.2 ~ 1.0 범위
      
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.fromTo(layer, 
          {
            y: `-${speed * 100}%`,
          },
          {
            y: `${speed * 100}%`,
            ease: 'none',
          }
        ),
      });
    });

    // 정리 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, maxZ]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ParallaxContainer; 