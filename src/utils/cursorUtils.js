/**
 * 커서 툴팁 데이터를 전송하는 유틸리티 함수
 * 마우스 오버 시 커서에 표시할 텍스트 내용을 전달합니다.
 */

/**
 * 커서 툴팁에 데이터를 전송합니다.
 * @param {string} content - 커서에 표시할 텍스트 내용
 */
export const sendTooltipData = (content) => {
  const event = new CustomEvent('cursorTooltipData', {
    detail: {
      tooltipContent: content
    }
  });
  document.dispatchEvent(event);
};

/**
 * 커서 툴팁 데이터를 초기화합니다.
 */
export const clearTooltipData = () => {
  const event = new CustomEvent('cursorTooltipData', {
    detail: {
      tooltipContent: null
    }
  });
  document.dispatchEvent(event);
}; 