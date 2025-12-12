import { useEffect, useRef } from 'react';

/**
 * CSS cursor 속성을 활용한 커스텀 커서 훅
 * 
 * @param {string|Object} cursor - 커서 URL 또는 CSS 기본 커서 이름
 * @param {Object} options - 커서 옵션
 * @param {[number, number]} options.hotspot - 핫스팟 좌표 [x, y] (URL 커서에만 적용)
 * @param {string} options.fallback - 실패 시 fallback 커서
 * @param {HTMLElement|Window} options.scope - 적용 범위
 * @param {boolean} options.hideOnMobile - 모바일에서 숨김 여부
 * @param {string} options.mediaQuery - 적용할 미디어 쿼리
 * @param {boolean} options.respectMotionPreference - prefers-reduced-motion 고려 여부
 * @param {boolean} options.preload - 커서 이미지 미리 로드 여부
 * 
 * Example usage:
 * useCssCursor('pointer'); // CSS 기본 커서
 * useCssCursor('/cursors/pixel-arrow.png', { hotspot: [6, 2] }); // 커스텀 이미지
 */
export function useCssCursor(
  cursor,
  {
    hotspot = [0, 0],
    fallback = 'auto',
    scope = window,
    hideOnMobile = true,
    mediaQuery = '(min-width: 768px)',
    respectMotionPreference = true,
    preload = false,
  } = {}
) {
  const imageRef = useRef(null);
  const originalCursorRef = useRef(null);

  // CSS 기본 커서 목록
  const basicCursors = [
    'auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress',
    'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy',
    'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'e-resize',
    'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize',
    'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize',
    'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out'
  ];

  useEffect(() => {
    // 타입 검증
    if (!cursor || typeof cursor !== 'string') {
      console.warn('useCssCursor: Invalid cursor provided');
      return;
    }

    // 모바일에서 숨김 처리
    if (hideOnMobile && !window.matchMedia(mediaQuery).matches) {
      console.log('useCssCursor: Skipping on mobile device');
      return;
    }

    // prefers-reduced-motion 고려
    if (respectMotionPreference && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('useCssCursor: Skipping due to reduced motion preference');
      return;
    }

    const target = scope === window ? document.body : scope;
    if (!target) {
      console.warn('useCssCursor: Invalid scope provided');
      return;
    }

    // 원본 커서 저장
    originalCursorRef.current = target.style.cursor || '';

    // CSS 기본 커서인지 확인
    const isBasicCursor = basicCursors.includes(cursor);
    
    if (isBasicCursor) {
      // CSS 기본 커서인 경우 직접 적용
      target.style.setProperty('cursor', cursor, 'important');
      console.log(`useCssCursor: Applied basic cursor → ${cursor}`);
    } else {
      // 커스텀 이미지 커서인 경우
      const cursorValue = `url(${cursor}) ${hotspot[0]} ${hotspot[1]}, ${fallback}`;
      console.log(`useCssCursor: Applying custom cursor → ${cursorValue}`);

      // 이미지 미리 로드
      if (preload) {
        const img = new Image();
        img.src = cursor;
        imageRef.current = img;
        
        // 이미지 로드 후 커서 적용
        img.onload = () => {
          target.style.setProperty('cursor', cursorValue, 'important');
          console.log(`useCssCursor: Custom cursor image loaded and applied → ${cursorValue}`);
        };

        // 이미지 로드 실패 시 fallback 커서 적용
        img.onerror = () => {
          console.warn(`useCssCursor: Failed to load cursor image: ${cursor}`);
          target.style.setProperty('cursor', fallback, 'important');
        };
      } else {
        // 즉시 커서 적용 (important 플래그 사용)
        target.style.setProperty('cursor', cursorValue, 'important');
        console.log(`useCssCursor: Custom cursor applied immediately → ${cursorValue}`);
      }
    }

    // 정리 함수
    return () => {
      if (target && originalCursorRef.current !== null) {
        target.style.cursor = originalCursorRef.current;
        console.log(`useCssCursor: Cursor reset to original → ${originalCursorRef.current || 'default'}`);
      }
    };
  }, [cursor, hotspot[0], hotspot[1], fallback, scope, hideOnMobile, mediaQuery, respectMotionPreference, preload]);

  // 커서 변경 함수 반환 (동적 변경용)
  const changeCursor = (newCursor, newOptions = {}) => {
    const target = scope === window ? document.body : scope;
    if (!target) return;

    const isBasicCursor = basicCursors.includes(newCursor);
    
    if (isBasicCursor) {
      target.style.setProperty('cursor', newCursor, 'important');
      console.log(`useCssCursor: Dynamic basic cursor change → ${newCursor}`);
    } else {
      const { hotspot: newHotspot = hotspot, fallback: newFallback = fallback } = newOptions;
      const cursorValue = `url(${newCursor}) ${newHotspot[0]} ${newHotspot[1]}, ${newFallback}`;
      target.style.setProperty('cursor', cursorValue, 'important');
      console.log(`useCssCursor: Dynamic custom cursor change → ${cursorValue}`);
    }
  };

  // 커서 리셋 함수
  const resetCursor = () => {
    const target = scope === window ? document.body : scope;
    if (target && originalCursorRef.current !== null) {
      target.style.cursor = originalCursorRef.current;
      console.log(`useCssCursor: Manual cursor reset → ${originalCursorRef.current || 'default'}`);
    }
  };

  return { changeCursor, resetCursor };
}

// 커서 프리셋
export const CURSOR_PRESETS = {
  pixelArrow: {
    url: '/cursors/pixel-arrow.png',
    hotspot: [6, 2],
  },
  crosshair: {
    url: '/cursors/crosshair.png',
    hotspot: [12, 12],
  },
  hand: {
    url: '/cursors/hand.png',
    hotspot: [10, 5],
  },
  magnifier: {
    url: '/cursors/magnifier.png',
    hotspot: [12, 12],
  },
};

// 프리셋 사용을 위한 헬퍼 함수
export function usePresetCursor(presetName, options = {}) {
  const preset = CURSOR_PRESETS[presetName];
  
  // 프리셋이 없는 경우에도 빈 문자열로 호출하여 Hook 규칙 준수
  const cursorUrl = preset ? preset.url : '';
  const cursorHotspot = preset ? preset.hotspot : [0, 0];
  
  const result = useCssCursor(cursorUrl, {
    hotspot: cursorHotspot,
    ...options,
  });

  // 프리셋이 없는 경우 경고 출력
  if (!preset) {
    console.warn(`useCssCursor: Unknown preset "${presetName}"`);
  }

  return result;
}

export default useCssCursor; 