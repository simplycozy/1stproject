import React, { useEffect, useRef, memo } from 'react';
import { Box } from '@mui/material';
import { transitionContent } from '../../data/contentData';
import { useBackground } from '../../context/BackgroundContext';
import useIsInView from '../../hooks/useIsInView';
import MaskingText from '../../components/patterns/typoraphy/MaskingText';
import { devLog } from '../../utils/logger';

/**
 * TransitionSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <TransitionSection />
 */
function TransitionSection() {
  const [ref, isInView] = useIsInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '0px -20% 0px 0px' // 섹션이 보이기 20% 전에 미리 감지
  });
  const { updateBackgroundMode } = useBackground();
  const isFirstRender = useRef(true);

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'TransitionSection');
    }
  }, [ref]);

  useEffect(() => {
    // 첫 렌더링은 건너뜀 (초기 false 상태 로깅 방지)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isInView) {
        updateBackgroundMode('dark');
      }
      return;
    }

    devLog('👁️ [TransitionSection] isInView changed:', {
      isInView,
      scrollY: window.scrollY || window.lenis?.scroll || 0,
    });

    // 섹션이 뷰포트에 보일 때 dark 모드로 전환
    if (isInView) {
      updateBackgroundMode('dark');
    }
  }, [isInView, updateBackgroundMode]);

  return (
    <Box
      ref={ref}
      data-section="TransitionSection"
      sx={{
        width: '300vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: 'transparent', // BackgroundLayer가 보이도록 투명하게
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        containerType: 'inline-size',
      }}
    >
      <MaskingText
        text={transitionContent.text}
        backgroundImage={transitionContent.imagePath}
        fontSize="calc(100cqw / 5)"
        //fontWeight={900}
        letterSpacing="-1cqw"
        sx={{
          willChange: 'font-size',
          backfaceVisibility: 'hidden',
        }}
      />
    </Box>
  );
}

export default memo(TransitionSection);

