import { safeSessionStorage } from './storageHelper';

/**
 * 네비게이션 타입 감지 유틸리티
 * URL 직접 입력, 링크 클릭, SharedObject 트랜지션을 구분합니다
 */

/**
 * URL을 직접 입력해서 접근했는지 감지
 * @returns {boolean} 직접 입력 여부
 */
export const isDirectNavigation = () => {
  // 1. 새로고침이나 직접 입력의 경우
  if (window.performance && window.performance.navigation) {
    // TYPE_RELOAD (1) = 새로고침
    // TYPE_NAVIGATE (0) 중에서도 referrer가 없으면 직접 입력
    const navType = window.performance.navigation.type;
    if (navType === 1) return true; // 새로고침
  }
  
  // 2. Referrer가 없거나 다른 도메인에서 온 경우
  if (!document.referrer) return true;
  
  // 3. 같은 도메인이지만 직접 입력한 경우 (추가 검증)
  const currentDomain = window.location.origin;
  const referrerDomain = new URL(document.referrer).origin;
  
  if (currentDomain !== referrerDomain) return true;
  
  return false;
};

/**
 * SharedObject 트랜지션으로 접근했는지 감지
 * @returns {boolean} SharedObject 트랜지션 여부
 */
export const isSharedObjectTransition = () => {
  // 1. 글로벌 상태 확인
  if (window.__THUMBNAIL_TRANSITION_STATE__) return true;
  
  // 2. 세션 스토리지 확인
  if (safeSessionStorage.getItem('thumbnailState')) return true;
  
  // 3. 스크롤 방지 플래그 확인
  if (safeSessionStorage.getItem('preventScrollRestoration')) return true;
  
  return false;
};

/**
 * 일반적인 링크나 브라우저 버튼으로 접근했는지 감지
 * @returns {boolean} 일반 네비게이션 여부
 */
export const isNormalNavigation = () => {
  return !isDirectNavigation() && !isSharedObjectTransition();
};

/**
 * 현재 네비게이션 타입을 반환
 * @returns {'direct' | 'shared-object' | 'normal'} 네비게이션 타입
 */
export const getNavigationType = () => {
  if (isSharedObjectTransition()) return 'shared-object';
  if (isDirectNavigation()) return 'direct';
  return 'normal';
};

/**
 * 네비게이션 타입별 설명을 반환 (디버깅용)
 * @returns {string} 설명
 */
export const getNavigationDescription = () => {
  const type = getNavigationType();
  
  switch (type) {
    case 'direct':
      return 'URL 직접 입력 또는 새로고침';
    case 'shared-object':
      return 'SharedObject 트랜지션';
    case 'normal':
      return '일반 링크 또는 브라우저 버튼';
    default:
      return '알 수 없는 네비게이션';
  }
};

/**
 * SharedObject 트랜지션에서 돌아오는 상황인지 감지
 * @returns {boolean} SharedObject에서 돌아오는 여부
 */
export const isReturningFromSharedObject = () => {
  // 현재 경로가 홈이고, SharedObject 관련 데이터가 있는 경우
  const isHomePage = window.location.pathname === '/';
  const hasSharedObjectData = isSharedObjectTransition();
  
  return isHomePage && hasSharedObjectData;
};

/**
 * 디버그 정보 출력
 */
export const logNavigationInfo = () => {
  const type = getNavigationType();
  const description = getNavigationDescription();
  
  console.log(`🧭 [Navigation] 타입: ${type} (${description})`, {
    직접입력: isDirectNavigation(),
    SharedObject: isSharedObjectTransition(),
    일반네비게이션: isNormalNavigation(),
    referrer: document.referrer,
    performanceType: window.performance?.navigation?.type,
    pathname: window.location.pathname
  });
}; 