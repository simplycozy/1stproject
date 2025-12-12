import React from 'react';
import { Box } from '@mui/material';

/**
 * BubbleBackground 내에서 사용되는 섹션 컴포넌트
 * 
 * Props:
 * @param {React.ReactNode} children - 섹션 내부에 렌더링될 자식 요소들 [Required]
 * @param {object} sx - 추가적인 MUI sx 스타일 객체 [Optional]
 * 
 * Example usage:
 * <BubbleSection>
 *   <Typography variant="h2">섹션 제목</Typography>
 * </BubbleSection>
 */
const BubbleSection = React.forwardRef(({ children, sx }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

BubbleSection.displayName = 'BubbleSection';

export default BubbleSection; 