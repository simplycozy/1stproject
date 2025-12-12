/**
 * SharedObjectTransition - 페이지 간 Shared Element Transition 구현
 * 
 * =====================================================================================
 * 📋 OVERALL FLOW (전체 작동 흐름)
 * =====================================================================================
 * 
 * 1️⃣ 이전 페이지 (목록) - SharedThumbnail 클릭
 *    - 썸네일의 정확한 화면상 위치(top, left, width, height) 계산
 *    - 위치 정보를 글로벌 상태와 sessionStorage에 저장
 *    - layoutId를 설정하여 framer-motion이 추적할 수 있도록 함
 *    - 이미지 프리로딩으로 다음 페이지에서 즉시 표시 가능하도록 준비
 *    - React Router로 상세 페이지로 네비게이션
 * 
 * 2️⃣ 페이지 전환 중
 *    - 브라우저가 새로운 페이지를 로드
 *    - DOM이 완전히 새로 생성됨 (framer-motion의 자동 추적 불가)
 *    - 저장된 위치 정보가 페이지 간 연결고리 역할
 * 
 * 3️⃣ 다음 페이지 (상세) - ItemDetailPage 마운트
 *    - 저장된 위치 정보를 글로벌 상태 또는 sessionStorage에서 복원
 *    - 동일한 layoutId로 이전 페이지와 연결점 생성
 *    - 복원된 위치에 이미지를 정확히 배치 (사용자는 썸네일이 그대로 있는 것처럼 느낌)
 *    - 500ms freeze 기간으로 깜빡임 방지
 * 
 * 4️⃣ Shared Element Transition 실행
 *    - framer-motion이 동일한 layoutId를 감지하고 자동 연결
 *    - initial(저장된 위치) → animate(전체화면)으로 부드러운 애니메이션
 *    - 위치, 크기, objectFit 등이 자연스럽게 변화
 *    - 애니메이션 완료 후 추가 콘텐츠 표시
 * 
 * =====================================================================================
 * 🔧 TECHNICAL IMPLEMENTATION (기술적 구현)
 * =====================================================================================
 * 
 * 📐 위치 계산: getBoundingClientRect() + 다양한 좌표계 (절대/상대/비율)
 * 💾 상태 저장: window.__GLOBAL__ + sessionStorage (이중 백업)
 * 🔗 연결: framer-motion layoutId로 요소 간 자동 매핑
 * ⏱️ 타이밍: 500ms freeze + preloading으로 자연스러운 전환
 * 🛡️ 안전장치: 직접 접근, 새로고침, 에러 상황 대응
 * 
 * =====================================================================================
 * 📦 COMPONENTS STRUCTURE (컴포넌트 구조)
 * =====================================================================================
 * 
 * preloadImage()     - 이미지 미리 로딩 유틸리티 함수
 * SharedThumbnail    - 목록 페이지의 클릭 가능한 썸네일 (위치 저장 + 네비게이션)
 * ItemListPage       - 썸네일들을 그리드로 배치하는 목록 페이지 래퍼
 * ItemDetailPage     - 전체화면 상세 페이지 (위치 복원 + 애니메이션 실행)
 * 
 * =====================================================================================
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion, AnimatePresence } from 'framer-motion';
import { safeSessionStorage, safeLocalStorage } from '../../../utils/storageHelper';


/**
 * 이미지 프리로딩 유틸리티 함수
 * 
 * 역할:
 * - 이미지를 미리 브라우저 캐시에 로드하여 다음 페이지에서 즉시 표시
 * - Promise 기반으로 로딩 완료/실패 처리
 * - 클릭 시와 컴포넌트 마운트 시 두 번 실행하여 확실한 캐싱
 * 
 * @param {string} src - 프리로드할 이미지 URL
 * @returns {Promise} 이미지 로딩 완료 Promise
 */
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

/**
 * SharedThumbnail 컴포넌트
 * 
 * 역할:
 * - 목록 페이지에서 클릭 가능한 썸네일 제공
 * - 클릭 시 정확한 화면상 위치 계산 및 저장
 * - layoutId 설정으로 다음 페이지와의 연결점 생성
 * - 이미지 프리로딩으로 매끄러운 전환 준비
 * - React Router 네비게이션 실행
 * 
 * 핵심 기능:
 * - calculateExactPosition(): 다양한 좌표계로 정확한 위치 계산
 * - handleClick(): 위치 저장 + 프리로딩 + 네비게이션 통합 처리
 * - layoutId 기반 framer-motion 추적 준비
 * 
 * Props:
 * @param {string} itemId - 아이템의 고유 ID [Required]
 * @param {string} imageUrl - 이미지 URL [Required]
 * @param {string} detailPath - 상세 페이지 경로 [Required]
 * @param {string} title - 썸네일 제목 [Optional]
 * @param {object} style - 추가 스타일 [Optional]
 * 
 * Example usage:
 * <SharedThumbnail 
 *   itemId="item-1"
 *   imageUrl="/images/image1.jpg"
 *   detailPath="/detail/item-1"
 *   title="Item Title"
 * />
 */
export const SharedThumbnail = ({ itemId, imageUrl, detailPath, title, style }) => {
  const navigate = useNavigate();
  const thumbnailRef = React.useRef(null);

  // 컴포넌트 마운트 시 이미지 미리 로드
  React.useEffect(() => {
    preloadImage(imageUrl).catch(err => console.error('Image preload failed:', err));
  }, [imageUrl]);

  /**
   * 정확한 위치 계산 함수
   * 
   * 역할:
   * - getBoundingClientRect()로 현재 썸네일의 화면상 위치 측정
   * - 다양한 좌표계 계산 (뷰포트, 절대, 비율)
   * - 화면 크기 변화에 대응할 수 있는 안정적인 위치 정보 제공
   * 
   * @returns {object|null} 위치 정보 객체 또는 null
   */
  const calculateExactPosition = () => {
    if (!thumbnailRef.current) return null;
    
    const element = thumbnailRef.current;
    const rect = element.getBoundingClientRect();
    
    // 위치 정보 계산
    const positionData = {
      // 뷰포트 내 상대 좌표 (getBoundingClientRect 결과)
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      
      // 스크롤을 고려한 문서 내 절대 좌표
      absoluteTop: rect.top + window.pageYOffset,
      absoluteLeft: rect.left + window.pageXOffset,
      
      // 뷰포트 크기에 대한 비율 좌표 (화면 크기가 바뀌어도 일관된 위치 유지)
      relativeTop: rect.top / window.innerHeight,
      relativeLeft: rect.left / window.innerWidth,
      relativeWidth: rect.width / window.innerWidth,
      relativeHeight: rect.height / window.innerHeight,
      
      // 타임스탬프
      timestamp: Date.now()
    };
    
    return positionData;
  };

  /**
   * 현재 스크롤 위치를 정밀하게 저장
   * Lenis와 네이티브 스크롤 모두 고려하여 모든 스크롤 환경에서 작동
   */
  const saveCurrentScrollPosition = () => {
    const scrollData = {
      // Lenis 스크롤 위치 (우선) - 부드러운 스크롤 라이브러리
      lenisY: window.lenis?.scroll || 0,
      lenisProgress: window.lenis?.progress || 0,
      lenisVelocity: window.lenis?.velocity || 0,
      lenisDirection: window.lenis?.direction || 0,
      lenisLimit: window.lenis?.limit || 0,
      
      // 네이티브 스크롤 위치 (백업) - 기본 브라우저 스크롤
      nativeY: window.pageYOffset || document.documentElement.scrollTop || 0,
      nativeX: window.pageXOffset || document.documentElement.scrollLeft || 0,
      
      // 뷰포트 및 문서 크기 정보 (스크롤 복원 시 환경 검증용)
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      document: {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      },
      
      // 헤더나 고정 요소 높이 고려
      header: {
        height: document.querySelector('header')?.getBoundingClientRect().height || 0,
      },
      
      // 메타 정보
      timestamp: Date.now(),
      source: window.lenis ? 'lenis' : 'native',
      userAgent: navigator.userAgent,
      pathname: window.location.pathname
    };
    
    console.log('📍 [SharedThumbnail] 스크롤 위치 저장:', {
      lenisY: scrollData.lenisY,
      nativeY: scrollData.nativeY,
      source: scrollData.source,
      viewport: scrollData.viewport
    });
    
    return scrollData;
  };

  /**
   * 썸네일 클릭 핸들러 - 스크롤 위치 포함 완전 개선 버전
   * 
   * 역할:
   * - 현재 스크롤 위치를 정밀하게 저장 (Lenis + 네이티브)
   * - 이미지 사전 로딩으로 다음 페이지 준비
   * - 정확한 위치 계산 및 통합 상태 저장
   * - React Router로 상세 페이지 네비게이션
   * 
   * 실행 순서:
   * 1. 스크롤 위치 저장 (최우선)
   * 2. 이미지 프리로딩
   * 3. 썸네일 위치 계산
   * 4. 통합 상태 저장 (위치 + 스크롤)
   * 5. 라우터 스크롤 방지 설정
   * 6. 페이지 이동
   */
  const handleClick = async () => {
    if (thumbnailRef.current) {
      console.log('🖱️ [SharedThumbnail] 클릭 시작:', itemId);
      
      // 1. 현재 스크롤 위치 저장 (최우선 - 페이지 변경 전에 저장해야 함)
      const scrollPosition = saveCurrentScrollPosition();
      
      // 2. 이미지 사전 로드
      try {
        await preloadImage(imageUrl);
        console.log('🖼️ [SharedThumbnail] 이미지 프리로딩 완료');
      } catch (err) {
        console.error('❌ [SharedThumbnail] 이미지 프리로딩 실패:', err);
      }
      
      // 3. 정확한 썸네일 위치 계산
      const positionData = calculateExactPosition();
      
      if (positionData) {
        // 4. 통합 트랜지션 상태 생성 (위치 + 스크롤 정보 통합)
        const transitionState = {
          rect: positionData,
          itemId,
          imageUrl,
          title,
          scrollPosition, // 🔥 핵심: 스크롤 위치 정보 포함
          timestamp: Date.now(),
          source: 'SharedThumbnail'
        };
        
        // 5. 글로벌 상태 저장 (최우선 - 가장 빠른 접근)
        window.__THUMBNAIL_TRANSITION_STATE__ = transitionState;
        
        // 6. 세션 스토리지 저장 (새로고침 대응)
        safeSessionStorage.setItem('thumbnailState', JSON.stringify(transitionState));
        
        // 7. 로컬 스토리지에 스크롤 위치 별도 백업 (영구 저장)
        safeLocalStorage.setItem('lastScrollPosition', JSON.stringify(scrollPosition));
        
        // 8. 라우터 스크롤 복원 방지 플래그 설정
        safeSessionStorage.setItem('preventScrollRestoration', 'true');
        
        console.log('💾 [SharedThumbnail] 통합 상태 저장 완료:', {
          itemId,
          hasPosition: !!positionData,
          hasScroll: !!scrollPosition,
          scrollY: scrollPosition.lenisY || scrollPosition.nativeY,
          viewportTop: positionData.top
        });
        
        // 9. 상세 페이지로 이동
        navigate(detailPath);
      } else {
        console.error('❌ [SharedThumbnail] 위치 계산 실패');
        // 위치 계산 실패 시에도 기본 네비게이션은 수행
        navigate(detailPath);
      }
    }
  };

  return (
    <Box
      ref={thumbnailRef}
      component={motion.div}
      layoutId={`thumbnail-container-${itemId}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
        height: '100%',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        },
        ...style
      }}
    >
      <Box
        component={motion.img}
        layoutId={`thumbnail-image-${itemId}`}
        src={imageUrl}
        alt={title || 'Thumbnail image'}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.2s ease-in-out',
        }}
      />
      {title && (
        <Box
          component={motion.div}
          layoutId={`thumbnail-title-${itemId}`}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            p: 1.5,
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
          }}
        >
          <Typography variant="subtitle1" component={motion.h3}>
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

SharedThumbnail.propTypes = {
  itemId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  detailPath: PropTypes.string.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
};

/**
 * ItemListPage 컴포넌트
 * 
 * 역할:
 * - SharedThumbnail들을 그리드 레이아웃으로 배치
 * - 목록 페이지의 진입 애니메이션 제공
 * - 각 아이템에 대한 detailPath 자동 생성
 * 
 * 특징:
 * - CSS Grid 기반 반응형 레이아웃
 * - 개별 썸네일의 staggered 애니메이션
 * - basePath를 활용한 라우팅 경로 자동 구성
 * 
 * Props:
 * @param {array} items - 목록에 표시할 아이템 배열 [Required]
 * @param {string} basePath - 상세 페이지 기본 경로 [Required]
 * @param {object} gridProps - 그리드에 전달할 추가 props [Optional]
 * 
 * Example usage:
 * <ItemListPage 
 *   items={[{ id: 'item-1', imageUrl: '/images/image1.jpg', title: 'Item 1' }]}
 *   basePath="/details"
 * />
 */
export const ItemListPage = ({ items, basePath, gridProps = {} }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 3,
        p: 3,
        ...gridProps.sx
      }}
    >
      {items.map((item) => (
        <Box 
          key={item.id} 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{ 
            aspectRatio: '1/1',
            height: '250px',
          }}
        >
          <SharedThumbnail
            itemId={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            detailPath={`${basePath}/${item.id}`}
          />
        </Box>
      ))}
    </Box>
  );
};

ItemListPage.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
  basePath: PropTypes.string.isRequired,
  gridProps: PropTypes.object,
};

/**
 * ItemDetailPage 컴포넌트
 * 
 * 역할:
 * - 저장된 위치 정보를 복원하여 연속성 제공
 * - layoutId 기반 Shared Element Transition 실행
 * - 전체화면 상세 보기 및 추가 콘텐츠 표시
 * - 직접 접근/새로고침 등 예외 상황 처리
 * 
 * 핵심 기능:
 * - getPositionStyle(): 저장된 위치 정보를 CSS 스타일로 변환
 * - getTargetStyle(): 애니메이션 목표 스타일 계산
 * - 다단계 상태 관리: 로딩 → freeze → 애니메이션 → 완료
 * - Fallback UI: 위치 정보가 없을 때 기본 레이아웃
 * 
 * 상태 흐름:
 * 1. isLoading: 위치 정보 복원 및 이미지 프리로딩
 * 2. freezePosition: 저장된 위치에 고정 (깜빡임 방지)
 * 3. isAnimationReady: framer-motion 애니메이션 시작
 * 4. isAnimationComplete: 추가 콘텐츠 표시
 * 
 * Props:
 * @param {string} itemId - 아이템의 고유 ID [Required]
 * @param {string} imageUrl - 이미지 URL [Required]
 * @param {function} onBack - 뒤로가기 버튼 클릭 시 실행할 함수 [Required]
 * @param {string} title - 아이템 제목 [Optional]
 * @param {node} children - 상세 페이지에 표시할 추가 콘텐츠 [Optional]
 * 
 * Example usage:
 * <ItemDetailPage 
 *   itemId="item-1"
 *   imageUrl="/images/image1.jpg"
 *   title="Item 1"
 *   onBack={() => navigate(-1)}
 * >
 *   <Typography>상세 내용</Typography>
 * </ItemDetailPage>
 */
export const ItemDetailPage = ({ itemId, imageUrl, title, onBack, children }) => {
  const location = useLocation();
  const [transitionState, setTransitionState] = React.useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);
  const [isAnimationReady, setIsAnimationReady] = React.useState(false);
  
  // freeze 상태 추가 - 애니메이션 시작 전에는 true
  const [freezePosition, setFreezePosition] = React.useState(true);
  
  // 데이터 로딩 상태 추가
  const [isLoading, setIsLoading] = React.useState(true);
  
  // 직접 접근 또는 새로고침 여부 (transitionState가 없는 경우)
  const [isDirectAccess, setIsDirectAccess] = React.useState(false);
  
  /**
   * 스크롤 위치 복원 함수
   * Lenis와 네이티브 스크롤 모두 지원하여 안정적으로 복원
   */
  const restoreScrollPosition = React.useCallback((scrollData, delay = 300) => {
    if (!scrollData) return false;
    
    console.log('🎯 [ItemDetailPage] 스크롤 위치 복원 시도:', {
      lenisY: scrollData.lenisY,
      nativeY: scrollData.nativeY,
      source: scrollData.source,
      delay
    });
    
    // 페이지 로드 완료 후 지연시간을 두고 스크롤 복원
    setTimeout(() => {
      // Lenis 기반 복원 (우선) - 부드러운 스크롤 라이브러리
      if (scrollData.source === 'lenis' && window.lenis && scrollData.lenisY !== undefined) {
        console.log('🚀 [ItemDetailPage] Lenis 스크롤 복원:', scrollData.lenisY);
        try {
          window.lenis.scrollTo(scrollData.lenisY, { 
            immediate: true,
            force: true,
            lock: false,
            duration: 0.1 // 매우 빠른 복원
          });
          
          // Lenis 복원이 안정적으로 적용되도록 추가 체크
          setTimeout(() => {
            if (Math.abs(window.lenis.scroll - scrollData.lenisY) > 50) {
              console.log('🔄 [ItemDetailPage] Lenis 재시도:', scrollData.lenisY);
              window.lenis.scrollTo(scrollData.lenisY, { immediate: true });
            }
          }, 100);
          
        } catch (err) {
          console.error('❌ [ItemDetailPage] Lenis 복원 실패:', err);
          // Lenis 실패 시 네이티브로 폴백
          window.scrollTo({
            left: scrollData.nativeX || 0,
            top: scrollData.nativeY || 0,
            behavior: 'auto'
          });
        }
      }
      // 네이티브 스크롤 복원 (백업) - 기본 브라우저 스크롤
      else if (scrollData.nativeY !== undefined) {
        console.log('🔄 [ItemDetailPage] 네이티브 스크롤 복원:', scrollData.nativeY);
        try {
          window.scrollTo({
            left: scrollData.nativeX || 0,
            top: scrollData.nativeY || 0,
            behavior: 'auto'
          });
          
          // 네이티브 스크롤 복원 검증
          setTimeout(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(currentScroll - scrollData.nativeY) > 50) {
              console.log('🔄 [ItemDetailPage] 네이티브 재시도:', scrollData.nativeY);
              window.scrollTo({ top: scrollData.nativeY, behavior: 'auto' });
            }
          }, 100);
          
        } catch (err) {
          console.error('❌ [ItemDetailPage] 네이티브 복원 실패:', err);
        }
      }
    }, delay);
    
    return true;
  }, []);

  React.useEffect(() => {
    // 로딩 상태 시작
    setIsLoading(true);
    setIsAnimationComplete(false);
    setIsAnimationReady(false);
    setFreezePosition(true);
    setIsDirectAccess(false);
    
    // 트랜지션 상태 복원 (개선된 버전 - 스크롤 위치 포함)
    let restoredTransitionState = null;
    let scrollRestorationAttempted = false;
    
    // 1순위: 글로벌 상태에서 복원
    const globalState = window.__THUMBNAIL_TRANSITION_STATE__;
    
    if (globalState) {
      restoredTransitionState = globalState;
      console.log('🔄 [ItemDetailPage] 글로벌 상태에서 트랜지션 복원:', globalState);
      
      // 🔥 핵심: 스크롤 위치 복원 (글로벌 상태)
      if (globalState.scrollPosition) {
        console.log('📍 [ItemDetailPage] 글로벌 상태에서 스크롤 복원 시도');
        scrollRestorationAttempted = restoreScrollPosition(globalState.scrollPosition, 200);
      }
      
      // 글로벌 상태 사용 후 정리
      window.__THUMBNAIL_TRANSITION_STATE__ = null;
    } 
    // 2순위: 세션 스토리지에서 복원
    else {
      const storedState = safeSessionStorage.getItem('thumbnailState');
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState);
          restoredTransitionState = parsedState;
          console.log('🔄 [ItemDetailPage] 세션 스토리지에서 트랜지션 복원:', parsedState);
          
          // 🔥 핵심: 스크롤 위치 복원 (세션 스토리지)
          if (parsedState.scrollPosition) {
            console.log('📍 [ItemDetailPage] 세션 스토리지에서 스크롤 복원 시도');
            scrollRestorationAttempted = restoreScrollPosition(parsedState.scrollPosition, 250);
          }
          
        } catch (e) {
          console.error('❌ [ItemDetailPage] 상태 파싱 에러:', e);
          setIsDirectAccess(true);
        }
      } 
      // 3순위: 로컬 스토리지에서 스크롤만 복원 (백업)
      else {
        const localScrollData = safeLocalStorage.getItem('lastScrollPosition');
        if (localScrollData) {
          try {
            const scrollData = JSON.parse(localScrollData);
            console.log('📍 [ItemDetailPage] 로컬 스토리지에서 스크롤 복원 시도');
            scrollRestorationAttempted = restoreScrollPosition(scrollData, 300);
          } catch (e) {
            console.error('❌ [ItemDetailPage] 로컬 스크롤 데이터 파싱 에러:', e);
          }
        }
        
        setIsDirectAccess(true);
      }
    }
    
    // 복원된 트랜지션 상태 설정
    if (restoredTransitionState) {
      setTransitionState(restoredTransitionState);
    }
    
    // 스크롤 복원 상태 로깅
    if (scrollRestorationAttempted) {
      console.log('✅ [ItemDetailPage] 스크롤 복원 시도 완료');
    } else {
      console.log('⚠️ [ItemDetailPage] 복원할 스크롤 정보 없음');
    }
    
    // 컴포넌트 마운트 시 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 이미지 프리로딩
    preloadImage(imageUrl)
      .then(() => {
        // 위치 정보와 이미지 로딩이 모두 완료되면 로딩 상태 종료
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Image preload failed:', err);
        setIsLoading(false); // 에러가 발생해도 로딩 상태 종료
      });
    
    // 애니메이션 시작 지연 (깜빡임 방지)
    const animationTimer = setTimeout(() => {
      setFreezePosition(false);
      setIsAnimationReady(true);
    }, 500);
    
    // 최대 2초 후에는 로딩 상태 강제 종료 (무한 로딩 방지)
    const loadingTimeoutTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
      clearTimeout(animationTimer);
      clearTimeout(loadingTimeoutTimer);
    };
  }, [imageUrl, location, restoreScrollPosition]);
  
  const actualItemId = transitionState?.itemId || itemId;
  
  // 썸네일에서 가져온 위치 정보로 절대 위치 스타일 생성
  const getPositionStyle = () => {
    if (!transitionState?.rect) return {};
    
    const rect = transitionState.rect;
    
    // 상대 비율 기반 (화면 크기 변화에 강함)
    if (rect.relativeTop !== undefined) {
      return {
        position: 'fixed',
        top: `${rect.relativeTop * 100}%`,
        left: `${rect.relativeLeft * 100}%`,
        width: `${rect.relativeWidth * 100}%`,
        height: `${rect.relativeHeight * 100}%`
      };
    }
    
    // 기본 방식 (뷰포트 상대 좌표)
    return {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  };
  
  // 애니메이션 대상 스타일 계산
  const getTargetStyle = () => {
    return {
      position: 'relative',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      opacity: 1,
      scale: 1
    };
  };
  
  // 트랜지션 완료 핸들러 - 스크롤 데이터 보존 개선
  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    
    console.log('✅ [ItemDetailPage] 트랜지션 애니메이션 완료 - 최소한 정리');
    
    // 1. 라우터 스크롤 방지 플래그 해제
    safeSessionStorage.removeItem('preventScrollRestoration');
    
    // 🔥 2. 스크롤 데이터는 보존 - 뒤로가기를 위해 유지
    // safeSessionStorage.removeItem('thumbnailState'); // 삭제하지 않음
    // safeLocalStorage.removeItem('lastScrollPosition'); // 삭제하지 않음
    
    // 3. 글로벌 상태는 유지 (뒤로가기용)
    // if (window.__THUMBNAIL_TRANSITION_STATE__) {
    //   window.__THUMBNAIL_TRANSITION_STATE__ = null; // 삭제하지 않음
    // }
    
    // 4. 스크롤 잠금 해제 (만약 있다면)
    document.body.style.overflow = '';
    
    console.log('🧹 [ItemDetailPage] 최소한 정리 완료 - 스크롤 데이터 보존');
  };
  
  // 위치 정보가 없고 로딩 중인 경우 로딩 화면 표시
  if (isLoading && !isDirectAccess) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  return (
    <AnimatePresence mode="sync">
      <Box
        component={motion.div}
        key={`detail-page-${actualItemId}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          zIndex: 1200,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* 배경 이미지 블러 및 필터 적용 */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.4)',
            overflow: 'hidden',
            zIndex: -1,
          }}
        />

        <IconButton
          onClick={onBack}
          component={motion.button}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            top: '1.5rem',
            left: '1.5rem',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            color: 'black',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: 2,
            zIndex: 1400,
            p: 1,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        
        {/* 이미지 컨테이너 */}
        {isDirectAccess || !transitionState?.rect ? (
          // 직접 접근 시 또는 위치 정보가 없을 때 기본 레이아웃
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'hidden',
              width: '100%',
              height: '100vh',
            }}
          >
            <Box
              component={motion.img}
              src={imageUrl}
              alt={title || 'Detail image'}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: '100vh',
              }}
            />
            
            {title && (
              <Box
                component={motion.div}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  p: 3,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                }}
              >
                <Typography 
                  variant="h4"
                  component="h3"
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}
          </Box>
        ) : freezePosition ? (
          // 고정된 위치 (애니메이션 시작 전)
          <Box
            component="div"
            sx={{ 
              ...getPositionStyle(),
              overflow: 'hidden',
              zIndex: 1300
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={title || 'Detail image'}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: transitionState?.rect ? 'cover' : 'contain',
              }}
            />
            
            {title && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  p: transitionState?.rect ? 1.5 : 3,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                }}
              >
                <Typography 
                  variant={transitionState?.rect ? "subtitle1" : "h4"}
                  component="h3"
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          // 애니메이션 처리
          <Box
            component={motion.div}
            layoutId={`thumbnail-container-${actualItemId}`}
            initial={getPositionStyle()}
            animate={isAnimationReady ? getTargetStyle() : getPositionStyle()}
            transition={{
              type: 'tween',
              duration: 0.6,
              ease: 'easeInOut'
            }}
            onAnimationComplete={handleAnimationComplete}
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'hidden',
            }}
          >
            <Box
              component={motion.img}
              layoutId={`thumbnail-image-${actualItemId}`}
              src={imageUrl}
              alt={title || 'Detail image'}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: isAnimationReady ? 'contain' : 'cover',
                maxHeight: '100vh',
              }}
            />
            
            {title && (
              <Box
                component={motion.div}
                layoutId={`thumbnail-title-${actualItemId}`}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  p: isAnimationReady ? 3 : 1.5,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                }}
              >
                <Typography 
                  variant={isAnimationReady ? "h4" : "subtitle1"}
                  component={motion.h3}
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        {/* 콘텐츠 컨테이너 */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isAnimationComplete ? 1 : 0,
            y: isAnimationComplete ? 0 : 50
          }}
          transition={{ duration: 0.5 }}
          sx={{ 
            padding: 3, 
            flex: 1, 
            overflow: 'auto',
            marginTop: '-80px',
            position: 'relative',
            zIndex: 10,
            pointerEvents: isAnimationComplete ? 'auto' : 'none',
          }}
        >
          {children}
        </Box>
      </Box>
    </AnimatePresence>
  );
};

ItemDetailPage.propTypes = {
  itemId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

/**
 * 목록 페이지 컴포넌트 - 라우팅을 통해 별도의 페이지로 사용
 */
export default ItemListPage; 