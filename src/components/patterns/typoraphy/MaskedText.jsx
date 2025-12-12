import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * MaskedText 컴포넌트
 * 텍스트를 마스크로 사용하여 뒤에 있는 콘텐츠를 텍스트 모양으로만 표시
 * 
 * Props:
 * @param {string} text - 마스킹에 사용할 텍스트 [Required]
 * @param {React.ReactNode} children - 마스킹될 콘텐츠 (이미지, 요소 등) [Optional]
 * @param {string} background - children이 없을 때 사용할 배경 [Optional, 기본값: 그라데이션]
 * @param {string|object} fontSize - 텍스트 크기 [Optional, 기본값: 반응형]
 * @param {string} fontWeight - 텍스트 굵기 [Optional, 기본값: 900]
 * @param {string} textAlign - 텍스트 정렬 [Optional, 기본값: center]
 * @param {object} sx - 추가 스타일 [Optional]
 * 
 * Example usage:
 * <MaskedText text="ORDINARY">
 *   <img src="background.jpg" alt="" />
 * </MaskedText>
 */
function MaskedText({ 
  text, 
  children,
  background = 'linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
  fontSize = {
    xs: '12vw',  // 모바일: 화면 폭의 12%
    sm: '14vw',  // 태블릿: 화면 폭의 14%
    md: '16vw',  // 데스크탑: 화면 폭의 16%
    lg: '18vw',  // 큰 화면: 화면 폭의 18%
    xl: '20vw'   // 매우 큰 화면: 화면 폭의 20%
  },
  fontWeight = 900,
  sx = {}
}) {
  // SVG 마스크를 인라인으로 생성
  const createInlineSvgMask = () => {
    return (
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
      >
        <defs>
          <mask id="textMask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="120"
              fontWeight={fontWeight}
              fill="white"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              {text}
            </text>
          </mask>
        </defs>
      </svg>
    );
  };

  // children이 있을 때 (이미지 마스킹)
  if (children) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...sx
        }}
      >
        {createInlineSvgMask()}
        
        {/* 마스킹될 콘텐츠 */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            
            // SVG 마스크 적용
            mask: 'url(#textMask)',
            WebkitMask: 'url(#textMask)',
          }}
        >
          {children}
        </Box>

        {/* 실제 텍스트 (레이아웃 참조용, 투명) */}
        <Typography
          variant="h1"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            
            fontSize: fontSize,
            fontWeight: fontWeight,
            textAlign: 'center',
            lineHeight: 0.8,
            letterSpacing: sx.letterSpacing || '-0.02em',
            
            // 완전히 투명하게
            opacity: 0,
            
            // 기타 스타일
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  }

  // children이 없을 때 (기본 그라데이션)
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: 'center',
        lineHeight: 0.8,
        letterSpacing: sx.letterSpacing || '-0.02em',
        
        // 🎨 텍스트 마스킹 핵심 스타일
        background: background,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        
        // 기타 스타일
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        
        ...sx
      }}
    >
      {text}
    </Typography>
  );
}

export default MaskedText; 