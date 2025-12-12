import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 전역 에러 핸들러 - Storage 에러를 조용히 처리 (가장 먼저 등록)
if (typeof window !== 'undefined') {
  // 동기 에러 핸들러
  const originalErrorHandler = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    const errorMessage = error?.message || message || '';
    const errorName = error?.name || '';
    const errorString = String(errorMessage).toLowerCase();
    
    if (
      errorString.includes('storage') ||
      errorString.includes('access to storage') ||
      errorString.includes('not allowed from this context')
    ) {
      // Storage 관련 에러는 조용히 무시
      console.debug('🔇 [Storage Error Handler] Storage 접근 에러 무시:', errorMessage);
      return true; // 에러 처리됨
    }
    
    // 다른 에러는 기존 핸들러로 전달
    if (originalErrorHandler) {
      return originalErrorHandler(message, source, lineno, colno, error);
    }
    return false;
  };

  // Promise rejection 핸들러
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const errorMessage = reason?.message || String(reason) || '';
    const errorName = reason?.name || '';
    const errorString = String(errorMessage).toLowerCase();
    
    if (
      errorString.includes('storage') ||
      errorString.includes('access to storage') ||
      errorString.includes('not allowed from this context') ||
      errorName.toLowerCase().includes('storage')
    ) {
      // Storage 관련 에러는 조용히 무시
      console.debug('🔇 [Storage Error Handler] Storage Promise rejection 무시:', errorMessage);
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, { capture: true }); // capture phase에서 처리

  // 일반 error 이벤트 핸들러 (추가 보호)
  window.addEventListener('error', (event) => {
    const errorMessage = event.error?.message || event.message || '';
    const errorString = String(errorMessage).toLowerCase();
    
    if (
      errorString.includes('storage') ||
      errorString.includes('access to storage') ||
      errorString.includes('not allowed from this context')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true); // capture phase에서 처리
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
