import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '../../../../hooks/useMousePosition';

/**
 * Spotlight 커서 컴포넌트
 * 
 * Props:
 * @param {Object} state - 커서 상태 객체 [Required]
 * @param {Object} state.spotlight - 스포트라이트 설정 [Optional]
 * @param {number} state.spotlight.radius - 스포트라이트 반지름 [Optional, 기본값: 150]
 * @param {number} state.spotlight.intensity - 어둠 강도 [Optional, 기본값: 0.3]
 * 
 * Example usage:
 * <Spotlight state={{ spotlight: { radius: 200, intensity: 0.5 } }} />
 */
function Spotlight({ state }) {
  const { position } = useMousePosition();
  const overlayRef = useRef(null);

  const { radius = 150, intensity = 0.3 } = state.spotlight || {};

  // 기본 커서 숨기기
  useEffect(() => {
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = originalCursor;
    };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    let rafId;
    
    const updateMask = () => {
      const { x, y } = position;
      overlayRef.current.style.setProperty(
        '--mask-position', 
        `${x}px ${y}px`
      );
    };

    const handleMouseMove = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateMask);
    };

    // 초기 위치 설정
    updateMask();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [position]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: `rgba(0, 0, 0, ${intensity})`,
        pointerEvents: 'none',
        zIndex: 9997,
        willChange: 'transform',
        maskImage: `radial-gradient(circle ${radius}px at var(--mask-position, 50% 50%), transparent 0%, transparent 70%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${radius}px at var(--mask-position, 50% 50%), transparent 0%, transparent 70%, black 100%)`,
        '--mask-position': '50% 50%',
      }}
    />
  );
}

export default Spotlight; 