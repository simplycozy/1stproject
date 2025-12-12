import React from 'react';
import { Box } from '@mui/material';

/**
 * ParallaxLayer 컴포넌트
 * 
 * ParallaxContainer 내에서 사용되는 개별 레이어
 * depthZ 값에 따라 서로 다른 패럴랙스 속도를 가짐
 * 
 * Props:
 * @param {React.ReactNode} children - 레이어 내용 [Required]
 * @param {number} depthZ - 깊이 레벨 (1~maxZ, 높을수록 전경) [Required]
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 * 
 * Example usage:
 * <ParallaxLayer depthZ={1}>
 *   <img src="background.jpg" />
 * </ParallaxLayer>
 * <ParallaxLayer depthZ={5}>
 *   <Typography>전경 텍스트</Typography>
 * </ParallaxLayer>
 */
function ParallaxLayer({ children, depthZ, sx = {} }) {
  return (
    <Box
      data-parallax-layer
      data-depth-z={depthZ}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: depthZ, // 높은 depthZ 값이 앞에 표시
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ParallaxLayer; 