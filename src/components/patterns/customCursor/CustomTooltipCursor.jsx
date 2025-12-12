import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useBackground } from '../../../context/BackgroundContext';

/**
 * 마우스를 따라다니는 'O' 형태의 커스텀 툴팁 커서 컴포넌트
 * - 평소에는 'O' 모양, 클릭 시 'D' 모양으로 변경
 * - 특정 요소에 마우스 오버 시 툴팁 정보 표시 기능 추가
 * - 배경 밝기에 따라 색상 자동 조정
 * - 링크나 버튼에 마우스 올리면 크기가 커지고 빛나는 효과
 * 
 * @param {object} props
 * @param {number} props.size - 커서의 크기 (기본값: 40)
 * @param {number} props.borderWidth - 테두리 두께 (기본값: 6)
 * @param {number} props.lag - 마우스 추적 지연 시간 (기본값: 0.1)
 * @param {string} props.color - 커서 색상 (배경 자동 감지보다 우선) [Optional]
 */
const CustomTooltipCursor = ({ 
  size = 40, 
  borderWidth = 6, 
  lag = 0.1,
  color
}) => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const { backgroundMode } = useBackground();
  
  // 툴팁 상태 추가
  const [tooltipContent, setTooltipContent] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // 배경 밝기에 따른 색상 설정 (props color가 우선)
  const cursorColor = color || (backgroundMode === 'dark' ? '#ffffff' : '#222222');
  const cursorGlowColor = color 
    ? `${color}80` 
    : backgroundMode === 'dark' 
      ? 'rgba(255, 255, 255, 0.5)' 
      : 'rgba(34, 34, 34, 0.5)';
  
  // 마우스 위치 저장용 ref (렌더링 트리거 없이 값 변경)
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const currentCursorSize = useRef(size);
  
  // 기본 커서 숨기기
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  // 마우스 이벤트 처리
  useEffect(() => {
    const onMouseMove = (e) => {
      // 마우스 좌표 업데이트
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // 처음 보이게 될 때는 즉시 이동 (지연 없이)
      if (!isVisible) {
        cursorPosition.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }
    };
    
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    // 링크 및 버튼 호버 처리
    const onLinkHoverStart = () => setIsHoveringLink(true);
    const onLinkHoverEnd = () => setIsHoveringLink(false);
    
    // 툴팁 데이터 수신 처리
    const handleTooltipData = (e) => {
      if (e.detail?.tooltipContent) {
        setTooltipContent(e.detail.tooltipContent);
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
        setTooltipContent(null);
      }
    };
    
    // 링크 요소들에 호버 이벤트 추가
    const linkElements = document.querySelectorAll('a, button, [role="button"]');
    linkElements.forEach(link => {
      link.addEventListener('mouseenter', onLinkHoverStart);
      link.addEventListener('mouseleave', onLinkHoverEnd);
    });
    
    // 마우스가 창 밖으로 나갔을 때 커서 숨기기
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    // 이벤트 리스너 등록
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('cursorTooltipData', handleTooltipData);
    
    // 애니메이션 함수
    let animationFrameId;
    
    const animateCursor = () => {
      // 현재 커서 크기 업데이트
      currentCursorSize.current = isClicking 
        ? size * 0.5 
        : isHoveringLink 
            ? size * 1.5 
            : size;
      
      // 부드러운 이동을 위한 선형 보간
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * lag;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * lag;
      
      // 커서 위치 업데이트 (툴팁일 때는 좌상단, 일반일 때는 중심 정렬)
      if (cursorRef.current) {
        if (showTooltip) {
          // 툴팁 모드: lag 적용하여 부드러운 이동
          cursorRef.current.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
        } else {
          // 일반 모드: lag 적용 + 중심 정렬
          const rect = cursorRef.current.getBoundingClientRect();
          const offsetX = rect.width / 2;
          const offsetY = rect.height / 2;
          cursorRef.current.style.transform = `translate(${cursorPosition.current.x - offsetX}px, ${cursorPosition.current.y - offsetY}px)`;
        }
      }
      
      // 애니메이션 지속
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    
    // 애니메이션 시작
    animationFrameId = requestAnimationFrame(animateCursor);
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('cursorTooltipData', handleTooltipData);
      
      linkElements.forEach(link => {
        link.removeEventListener('mouseenter', onLinkHoverStart);
        link.removeEventListener('mouseleave', onLinkHoverEnd);
      });
      
      cancelAnimationFrame(animationFrameId);
    };
  }, [lag, isVisible, showTooltip, backgroundMode]);
  
  // 커서 크기 계산 (상태에 따라 다름)
  const cursorSize = isClicking 
    ? size * 0.5 
    : isHoveringLink 
        ? size * 1.5 
        : size;
  
  // 툴팁 모드일 때의 높이 (기본 높이 유지)
  const tooltipHeight = size * 2.5;
  
  // 커서 모양 결정 - O(기본) 또는 네모(툴팁)
  const getBorderRadius = () => {
    if (showTooltip) {
      // 툴팁 표시 시 네모 형태
      return '8px';
    } else {
      // O 모양 (기본 원형, 클릭해도 원형 유지)
      return '50%';
    }
  };
  
  return (
    <Box
      ref={cursorRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: showTooltip ? 'auto' : cursorSize,
        height: showTooltip ? tooltipHeight : cursorSize,
        borderRadius: getBorderRadius(),
        border: `${borderWidth}px solid ${cursorColor}`,
        boxShadow: isHoveringLink 
          ? `0 0 20px ${cursorGlowColor}, 0 0 40px ${cursorGlowColor}` 
          : `0 0 10px ${cursorGlowColor}`,
        backgroundColor: showTooltip 
          ? backgroundMode === 'dark' ? 'rgba(40, 40, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)'
          : isClicking 
            ? cursorColor 
            : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none', // 마우스 이벤트를 방해하지 않도록
        zIndex: 9999,
        // transform은 JavaScript에서 직접 처리하므로 제거
        transition: isClicking 
          ? 'width 0.08s cubic-bezier(0.68, -0.55, 0.265, 1.55), height 0.08s cubic-bezier(0.68, -0.55, 0.265, 1.55), background-color 0.05s ease-out, box-shadow 0.05s ease-out'
          : 'width 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), height 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), border-radius 0.2s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out',
        opacity: isVisible ? 1 : 0,
        willChange: 'transform, width, height, border-radius, box-shadow',
        padding: showTooltip ? '8px 16px' : 0, // 툴팁 모드일 때 패딩 추가
        minWidth: showTooltip ? '120px' : 'auto', // 툴팁 최소 너비
        maxWidth: '300px', // 툴팁 최대 너비
        boxSizing: 'border-box',
        // 원형 커서에 중앙 점 제거 (이미 배경색으로 채워짐)
      }}
    >
      {showTooltip && tooltipContent && (
        <Typography 
          variant="body2" 
          sx={{ 
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
            color: backgroundMode === 'dark' ? '#ffffff' : '#121212',
          }}
        >
          {tooltipContent}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTooltipCursor; 