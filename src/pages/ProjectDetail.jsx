import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ProjectDetail
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <ProjectDetail />
 */
function ProjectDetail() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        px: { xs: 3, md: 6 },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        프로젝트 상세 페이지가 준비 중입니다
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        /project/:id 라우트에 연결되어 프로젝트 정보를 표시합니다.
      </Typography>
    </Box>
  );
}

export default ProjectDetail;

