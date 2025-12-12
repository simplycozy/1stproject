import React from 'react';
import { Box } from '@mui/material';
import { useCssCursor } from '../../../hooks/useCssCursor';

/**
 * CSS Cursor 컴포넌트
 * CSS cursor 속성을 활용하여 커스텀 커서를 적용하는 컴포넌트
 * 
 * Props:
 * @param {React.ReactNode} children - 커서가 적용될 영역의 자식 요소들 [Required]
 * @param {string} cursor - 커서 이미지 URL [Required]
 * @param {[number, number]} hotspot - 커서 이미지의 클릭 지점 좌표 [Optional, 기본값: [0, 0]]
 * @param {string} fallback - 이미지 로드 실패 시 fallback 커서 [Optional, 기본값: 'auto']
 * @param {boolean} hideOnMobile - 모바일에서 커서 숨김 여부 [Optional, 기본값: true]
 * @param {boolean} preload - 커서 이미지 미리 로드 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 객체 [Optional]
 *
 * Example usage:
 * <CssCursor 
 *   cursor="/cursors/custom-arrow.png" 
 *   hotspot={[12, 0]}
 *   preload={true}
 * >
 *   <div>커스텀 커서가 적용될 영역</div>
 * </CssCursor>
 */
function CssCursor({
  children,
  cursor,
  hotspot = [0, 0],
  fallback = 'auto',
  hideOnMobile = true,
  preload = false,
  sx = {},
}) {
  // 커서 훅 사용
  useCssCursor(cursor, {
    hotspot,
    fallback,
    hideOnMobile,
    preload,
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default CssCursor; 