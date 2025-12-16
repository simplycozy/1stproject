import React, { useEffect, useRef, memo } from 'react';
import { Box } from '@mui/material';
import { useBackground } from '../../context/BackgroundContext';
import { heroContent } from '../../data/contentData';
import FullPageSection from '../../components/commons/container/FullPageSection';
import HumanIllustCarousel from '../../template/HumanIllustCarousel';
import TypingEffect from '../../components/patterns/typoraphy/TypingEffect';
import useIsInView from '../../hooks/useIsInView';
import { devLog } from '../../utils/logger';

/**
 * HeroSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <HeroSection />
 *
 * Note: 텍스트 색상은 CSS 커스텀 프로퍼티(--theme-text-color)를 통해
 * BackgroundLayer에서 설정됨 (React 리렌더링 없이 색상 전환)
 */
function HeroSection() {
  const { updateBackgroundMode } = useBackground();
  const [ref, isInView] = useIsInView({ threshold: 0.7, triggerOnce: false });
  const isFirstRender = useRef(true);

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'HeroSection');
    }
  }, [ref]);

  useEffect(() => {
    // 첫 렌더링은 건너뜀 (초기 false 상태 로깅 방지)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // 첫 렌더링이어도 isInView가 true면 배경 모드 업데이트는 실행
      if (isInView) {
        updateBackgroundMode('light');
      }
      return;
    }

    devLog('👁️ [HeroSection] isInView changed:', {
      isInView,
      scrollY: window.scrollY || window.lenis?.scroll || 0,
    });

    // 섹션이 뷰포트에 보일 때 light 모드로 전환
    if (isInView) {
      updateBackgroundMode('light');
    }
  }, [isInView, updateBackgroundMode]);

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
          textColor="var(--theme-text-color, #000000)"
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

export default memo(HeroSection);

