import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ContactSection
 *
 * Props:
 * @param {object} props - 현재 전달받는 props 없음 [Optional]
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <Box
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
        Contact Section
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 640, opacity: 0.8 }}>
        연락처 및 강의 배너가 들어갈 영역입니다. 이후 폼이나 CTA를 배치하세요.
      </Typography>
    </Box>
  );
}

export default ContactSection;

