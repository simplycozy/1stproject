import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ProjectsSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // ProjectsSection 뷰포트 감지
        });
      },
      { threshold: [0, 0.1, 0.5, 1.0] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        px: { xs: 3, md: 6 },
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
        Projects Section
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 640, opacity: 0.8 }}>
        프로젝트 카드 그리드가 들어갈 영역입니다. 추후 데이터를 매핑하여 구성하세요.
      </Typography>
    </Box>
  );
}

export default ProjectsSection;

