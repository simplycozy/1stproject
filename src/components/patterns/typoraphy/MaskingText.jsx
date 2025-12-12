import React from 'react';
import { Box } from '@mui/material';

/**
 * MaskingText 컴포넌트
 * background-clip: text를 사용하여 이미지를 텍스트 모양으로 마스킹 표시
 * 
 * Props:
 * @param {string} text - 마스킹에 사용할 텍스트 [Required]
 * @param {string} backgroundImage - 마스킹될 이미지 URL [Required]
 * @param {string|object} fontSize - 텍스트 크기 [Optional, 기본값: calc(100cqw / 4.7)]
 * @param {string} fontWeight - 텍스트 굵기 [Optional, 기본값: 900]
 * @param {string} fontFamily - 폰트 패밀리 [Optional, 기본값: Blackout-Midnight]
 * @param {string} letterSpacing - 글자 간격 [Optional, 기본값: -68px]
 * @param {object} sx - 추가 스타일 [Optional]
 * 
 * Example usage:
 * <MaskingText 
 *   text="ORDINARY" 
 *   backgroundImage="/path/to/image.png"
 * />
 */
function MaskingText({ 
  text,
  backgroundImage,
  fontSize = 'calc(100cqw / 4.7)',
  fontWeight = 900,
  fontFamily = 'Blackout-Midnight, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing = '-68px',
  sx = {}
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100vh',
        
        // 텍스트를 마스크로 사용
        overflow: 'hidden',
        
        ...sx
      }}
    >
      {/* 이미지 (마스킹될 콘텐츠) */}
      <Box
        sx={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          
          // 🎯 이미지를 텍스트 모양으로 클리핑 - 반응형 배경 크기
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundSize: {
            xs: '120%', // 모바일: 이미지 크기 확대
            sm: '110%', // 태블릿: 약간 확대
            md: 'cover', // 데스크톱: 기본 커버
            lg: 'cover', // 대형 화면: 기본 커버
          },
          backgroundPosition: {
            xs: 'center center', // 모바일: 중앙 정렬
            sm: 'center center', // 태블릿: 중앙 정렬  
            md: 'center center', // 데스크톱: 중앙 정렬
            lg: 'center center', // 대형 화면: 중앙 정렬
          },
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          
          // 📝 폰트 설정
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          textAlign: 'center',
          lineHeight: 1,
          
          // 🔤 타이포그래피 설정
          whiteSpace: 'nowrap',
          letterSpacing: letterSpacing,
          
          // 🎯 텍스트 중앙 정렬
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          
          // 🚀 성능 최적화
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {text}
      </Box>
    </Box>
  );
}

export default MaskingText; 