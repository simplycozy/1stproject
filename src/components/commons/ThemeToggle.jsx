import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

/**
 * 테마 모드를 토글하는 버튼 컴포넌트
 * 
 * Props:
 * @param {string} mode - 현재 테마 모드 ('light' 또는 'dark') [Required]
 * @param {function} toggleMode - 테마 모드를 토글하는 함수 [Required]
 *
 * Example usage:
 * <ThemeToggle mode={mode} toggleMode={toggleMode} />
 */
function ThemeToggle({ mode, toggleMode }) {
  return (
    <Tooltip title={mode === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}>
      <IconButton
        onClick={toggleMode}
        color="inherit"
        aria-label="테마 모드 전환"
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(30deg)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle; 