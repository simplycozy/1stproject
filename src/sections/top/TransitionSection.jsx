import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { transitionContent } from '../../data/contentData';
import { useBackground } from '../../context/BackgroundContext';
import useIsInView from '../../hooks/useIsInView';
import MaskingText from '../../components/patterns/typoraphy/MaskingText';

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

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'TransitionSection');
    }
  }, []);

  useEffect(() => {
    console.log('👁️ [TransitionSection] isInView changed:', {
      isInView,
      timestamp: new Date().toISOString(),
      scrollY: window.scrollY || window.lenis?.scroll || 0,
      elementBounds: ref.current?.getBoundingClientRect(),
    });
    
    // 섹션이 뷰포트에 보일 때 dark 모드로 전환
    if (isInView) {
      updateBackgroundMode('dark');
    }
  }, [isInView, updateBackgroundMode, ref]);

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

export default TransitionSection;

