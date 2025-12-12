import { createContext, useContext } from 'react';

/**
 * 커서 상태 컨텍스트
 */
export const CursorContext = createContext({
  state: { variant: 'default' },
  setState: () => {},
});

/**
 * 커서 컨텍스트 사용 훅
 */
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}; 