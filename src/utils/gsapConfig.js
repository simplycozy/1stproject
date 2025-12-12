import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP 글로벌 설정 및 관리 유틸리티
 * 
 * 애플리케이션에서 사용할 GSAP 플러그인들을 중앙에서 관리합니다.
 * 앱 초기화 시 한 번만 호출하면 됩니다.
 * 
 * 현재 등록된 플러그인:
 * - ScrollTrigger: 스크롤 기반 애니메이션
 * 
 * 사용법:
 * 1. main.jsx에서 initializeGSAP() 호출
 * 2. 다른 컴포넌트에서는 이 파일에서 gsap, ScrollTrigger를 import
 * 
 * Example usage:
 * // main.jsx
 * import { initializeGSAP } from './utils/gsapConfig';
 * initializeGSAP();
 * 
 * // 컴포넌트에서
 * import { gsap, ScrollTrigger } from '@/utils/gsapConfig';
 */
let isInitialized = false;

export function initializeGSAP() {
  // 이미 초기화되었으면 중복 등록 방지
  if (isInitialized) {
    console.warn('⚠️ GSAP is already initialized');
    return;
  }

  // GSAP ScrollTrigger 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);
  
  isInitialized = true;
  
  console.log('🎨 GSAP plugins initialized:', {
    ScrollTrigger: '✅ Registered'
  });
}

// 기본 GSAP 인스턴스 export (모든 컴포넌트에서 사용)
export { gsap, ScrollTrigger };

// 초기화 상태 확인 함수
export function isGSAPInitialized() {
  return isInitialized;
} 