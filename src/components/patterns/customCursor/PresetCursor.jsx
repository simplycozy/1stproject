import React from 'react';
import { Box } from '@mui/material';
import { usePresetCursor } from '../../../hooks/useCssCursor';

/**
 * Preset Cursor 컴포넌트
 * 미리 정의된 커서 프리셋을 사용하여 커스텀 커서를 적용하는 컴포넌트
 * 
 * Props:
 * @param {React.ReactNode} children - 커서가 적용될 영역의 자식 요소들 [Required]
 * @param {string} presetName - 사용할 커서 프리셋 이름 (pixelArrow, crosshair, hand, magnifier) [Required]
 * @param {boolean} hideOnMobile - 모바일에서 커서 숨김 여부 [Optional, 기본값: true]
 * @param {boolean} preload - 커서 이미지 미리 로드 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 객체 [Optional]
 *
 * Example usage:
 * <PresetCursor presetName="pixelArrow" preload={true}>
 *   <div>픽셀 화살표 커서가 적용될 영역</div>
 * </PresetCursor>
 */
function PresetCursor({
  children,
  presetName,
  hideOnMobile = true,
  preload = false,
  sx = {},
}) {
  // 프리셋 커서 훅 사용
  usePresetCursor(presetName, {
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

export default PresetCursor; 