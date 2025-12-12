import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FullPageSection from '../../components/commons/container/FullPageSection';
import HumanIllustCarousel from '../../template/HumanIllustCarousel';
import { missionContent } from '../../data/contentData';

/**
 * MissionSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <MissionSection />
 */
function MissionSection() {
  const ref = useRef(null);

  // ref에 섹션 이름 추가 (디버깅용)
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-section', 'MissionSection');
    }
  }, []);

  return (
    <FullPageSection
      ref={ref}
      widthType="vw"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* 배경 일러스트 캐러셀 (원형 배치) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      >
        <HumanIllustCarousel pathType="circle" theme="dark" />
      </Box>

      {/* 텍스트 오버레이 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          px: { xs: 3, md: 6 },
          color: '#ffffff',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.6rem', lg: '3rem' },
          }}
        >
          {missionContent.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 720,
            opacity: 0.9,
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            fontSize: { xs: '1rem', md: '1.05rem' },
          }}
        >
          {missionContent.description.brandName} {missionContent.description.message.join('\n')}
        </Typography>
      </Box>
    </FullPageSection>
  );
}

export default MissionSection;

