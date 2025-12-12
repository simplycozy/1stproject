import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * ContentArea 컴포넌트
 * 모든 섹션과 Header에서 일관된 좌우 패딩을 제공하는 컨테이너
 * 최상단 부모 컨테이너 바로 아래에서 100% 크기 + 동일한 좌우 패딩으로 페이지 정렬을 맞춤
 * 
 * Props:
 * @param {React.ReactNode} children - 컨테이너에 들어갈 콘텐츠 [Required]
 * @param {Object} sx - 추가 스타일 [Optional]
 * @param {string} component - HTML 태그 또는 컴포넌트 [Optional, 기본값: 'div']
 * 
 * Example usage:
 * <ContentArea>
 *   <Typography>콘텐츠</Typography>
 * </ContentArea>
 */
const ContentArea = React.forwardRef(({ children, sx = {}, component = 'div', ...props }, ref) => {
  return (
    <Box
      ref={ref}
      component={component}
      sx={{
        width: '100%',
        px: { xs: '20px', md: '60px' }, // 일관된 좌우 패딩
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
});

ContentArea.displayName = 'ContentArea';

ContentArea.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  component: PropTypes.elementType,
};

export default ContentArea; 