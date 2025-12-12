import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useBackground } from '../../context/BackgroundContext';
import { heroContent } from '../../data/contentData';
import FullPageSection from '../../components/commons/container/FullPageSection';
import HumanIllustCarousel from '../../template/HumanIllustCarousel';
import TypingEffect from '../../components/patterns/typoraphy/TypingEffect';
import useIsInView from '../../hooks/useIsInView';

/**
 * HeroSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const { backgroundMode, updateBackgroundMode } = useBackground();
  const [ref, isInView] = useIsInView({ threshold: 0.7, triggerOnce: false });
  const textColor = backgroundMode === 'light' ? '#000000' : '#ffffff';

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'HeroSection');
    }
  }, []);

  useEffect(() => {
    console.log('👁️ [HeroSection] isInView changed:', {
      isInView,
      timestamp: new Date().toISOString(),
      scrollY: window.scrollY || window.lenis?.scroll || 0,
      elementBounds: ref.current?.getBoundingClientRect(),
    });
    
    // 섹션이 뷰포트에 보일 때 light 모드로 전환
    if (isInView) {
      updateBackgroundMode('light');
    }
  }, [isInView, updateBackgroundMode, ref]);

  return (
    <FullPageSection
      ref={ref}
      data-section="HeroSection"
      widthType="vw"
      sx={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw', // MissionSection과 동일하게 명시
        height: '100vh', // MissionSection과 동일하게 명시
      }}
    >
      {/* 배경 일러스트 캐러셀 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 1,
          pointerEvents: 'none',
        }}
      >
        <HumanIllustCarousel pathType="horizontal" theme="light" />
      </Box>

      {/* 메인 타이틀 타이핑 (좌측 하단) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 0, md: 8 },
          left: { xs: 16, md: 32 },
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'flex-start',
          maxWidth: { xs: '100vw', md: '85vw', lg: '65vw' },
          pl: { xs: 3, md: 12 }, // 패딩을 내부 Box로 이동
          pr: { xs: 3, md: 6 },
          // 부모의 transform에 영향받지 않도록 레이어 분리
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <TypingEffect
          texts={[heroContent.mainText]}
          typingSpeed={heroContent.typingSpeed}
          deleteSpeed={heroContent.deleteSpeed}
          startDelay={heroContent.startDelay}
          cursorType={heroContent.cursorType}
          textColor={textColor}
          cursorColor="#9e9e9e"
          cursorBlinkDuration={1.4}
          fontFamily="Blackout-Midnight, sans-serif"
          fontWeight="normal"
          variant={{ xs: 'h4', sm: 'h3', md: 'h2', lg: 'h1' }}
          textAlign="left"
          autoStart={true}
          dataSection="HeroSection"
          sx={{
            whiteSpace: 'pre',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
          }}
        />
      </Box>
    </FullPageSection>
  );
}

export default HeroSection;

