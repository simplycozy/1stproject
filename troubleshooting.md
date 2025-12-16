# Troubleshooting & Refactoring Log

프로젝트 코드 품질 개선을 위한 이슈 추적 문서

---

## Issue #1 - App.jsx 섹션 디버그 로그 위치 문제

**날짜**: 2025-12-16

**파일**: `src/App.jsx` (라인 117-149)

**문제**:
```javascript
// App.jsx에서 특정 페이지의 섹션을 직접 참조
const heroSection = document.querySelector('[data-section="HeroSection"]');
const transitionSection = document.querySelector('[data-section="TransitionSection"]');
const storySection = document.querySelector('[data-section="StorySection"]');
```

**이슈 내용**:
- LandingPage의 섹션 관련 디버그 로그가 App.jsx에 위치함
- App.jsx는 전역 설정/라우팅을 담당해야 하는데, 특정 페이지의 섹션 구조에 의존
- 관심사 분리(Separation of Concerns) 원칙 위반
- 섹션 추가/삭제/이름 변경 시 App.jsx도 수정 필요 (강한 결합)

**해결 방안**:
1. 각 섹션 컴포넌트 내부로 로깅 이동 (HeroSection.jsx, TransitionSection.jsx 등)
2. 또는 LandingPage.jsx에 디버그 전용 훅/컴포넌트 추가
3. App.jsx에는 Lenis/ScrollTrigger 전역 모니터링만 유지

**우선순위**: Medium

---

## Issue #2 - React에서 querySelector 사용 (안티패턴)

**날짜**: 2025-12-16

**파일**: `src/App.jsx` (라인 117-119)

**문제**:
```javascript
// DOM 직접 쿼리 - React 패러다임 위반
const heroSection = document.querySelector('[data-section="HeroSection"]');
```

**이슈 내용**:
- React의 선언적(Declarative) 패러다임에 어긋나는 명령형(Imperative) 코드
- React가 관리하는 DOM을 직접 조작하면 예측 불가능한 동작 발생 가능
- 컴포넌트 마운트 타이밍 문제로 null 참조 위험
- 리렌더링 시 참조 무효화 가능성

**해결 방안**:
1. `useRef` 사용
2. `SectionRefsContext`를 활용하여 ref 공유 (이미 존재함)
3. 콜백 ref 패턴 사용

**예시**:
```javascript
// Before (안티패턴)
const heroSection = document.querySelector('[data-section="HeroSection"]');

// After (React 방식)
const heroRef = useRef(null);
// 또는
const { heroRef } = useSectionRefs(); // Context 활용
```

**우선순위**: High

---

## Issue #3 - useIsInView와 중복되는 뷰포트 감지 로직

**날짜**: 2025-12-16

**파일**: `src/App.jsx` (라인 82-150)

**문제**:
```javascript
// App.jsx - 스크롤 이벤트로 뷰포트 감지
const handleScroll = () => {
  const heroRect = heroSection.getBoundingClientRect();
  console.log('📍 HeroSection:', {
    heroInView: heroRect.top < window.innerHeight && heroRect.bottom > 0,
  });
};
lenis.on('scroll', handleScroll);
```

```javascript
// HeroSection.jsx - useIsInView로 뷰포트 감지 (이미 존재)
const [ref, isInView] = useIsInView({ threshold: 0.7 });
console.log('👁️ [HeroSection] isInView changed:', { isInView });
```

**이슈 내용**:
- 동일한 기능(뷰포트 진입 감지)이 두 곳에서 중복 구현
- App.jsx: scroll 이벤트 기반 (비효율적, 20프레임마다 실행)
- useIsInView: IntersectionObserver 기반 (효율적, 브라우저 최적화)
- 불필요한 성능 오버헤드 발생

**해결 방안**:
1. App.jsx의 섹션별 뷰포트 감지 로직 삭제
2. 필요시 useIsInView 훅의 로깅 활용
3. App.jsx에는 전역 스크롤 모니터링(Lenis/ScrollTrigger 충돌 감지)만 유지

**우선순위**: Medium

---

## Issue #4 - 프로덕션 환경 console 로그 정리 필요

**날짜**: 2025-12-16

**파일**:
- `src/App.jsx`
- `src/sections/top/HeroSection.jsx`
- `src/sections/top/TransitionSection.jsx`
- `src/hooks/useIsInView.js`
- `src/context/BackgroundContext.jsx`

**문제**:
```javascript
// 프로덕션에서도 출력되는 디버그 로그들
console.log('📍 [Scroll Debug] HeroSection:', {...});
console.log('👁️ [HeroSection] isInView changed:', {...});
console.log('🎨 [Background] Mode Change Request:', {...});
console.warn('⚠️ [Scroll Conflict] Lenis와 네이티브 스크롤 불일치:', {...});
```

**이슈 내용**:
- 개발용 디버그 로그가 프로덕션 빌드에도 포함됨
- 사용자 브라우저 콘솔에 불필요한 로그 노출
- 성능에 미미하지만 부정적 영향

**해결 방안**:
1. 환경 변수로 조건부 로깅
```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('📍 Debug:', data);
}
```

2. 또는 커스텀 로거 유틸리티 생성
```javascript
// utils/logger.js
export const devLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
```

3. Vite 빌드 설정에서 console 제거 (이미 설정됨 - vite.config.js 확인 필요)

**우선순위**: Low (빌드 시 제거되면 무시)

---

## Issue #5 - App.jsx useEffect 복잡도

**날짜**: 2025-12-16

**파일**: `src/App.jsx` (라인 72-212)

**문제**:
```javascript
useEffect(() => {
  // 140줄의 복잡한 로직
  // - 스크롤 위치 추적
  // - 진동 감지
  // - 섹션별 뷰포트 체크
  // - 스크롤 충돌 감지
  // - ScrollTrigger 모니터링
  // - interval 설정
}, [lenisRef]);
```

**이슈 내용**:
- 단일 useEffect에 여러 책임이 혼재
- 가독성 저하 및 유지보수 어려움
- 테스트하기 어려운 구조

**해결 방안**:
1. 관심사별로 커스텀 훅 분리
```javascript
// hooks/useScrollConflictDetector.js
// hooks/useScrollTriggerMonitor.js
// hooks/useScrollOscillationDetector.js
```

2. App.jsx 간소화
```javascript
function App() {
  useLenisScroll(...);
  useScrollConflictDetector();  // 전역 모니터링만
  useScrollTriggerMonitor();

  return (...);
}
```

**우선순위**: Medium

---

## Issue #6 - 섹션별 뷰포트 감지 패턴 불일치

**날짜**: 2025-12-16

**파일**:
- `src/sections/StorySection.jsx`
- `src/sections/ProjectsSection.jsx`

**문제**:
```javascript
// StorySection.jsx - 직접 IntersectionObserver 구현
React.useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log('📖 [StorySection] Intersection:', {...}); // ❌ devLog 미적용
      });
    },
    { threshold: [0, 0.1, 0.5, 1.0] }
  );
  observer.observe(sectionRef.current);
}, []);
```

```javascript
// HeroSection.jsx - useIsInView 훅 사용 (권장 패턴)
const [ref, isInView] = useIsInView({ threshold: 0.7 });
```

**이슈 내용**:
- `useIsInView` 훅이 이미 존재하는데 일부 섹션에서 직접 IntersectionObserver 구현
- 코드 중복 및 일관성 없는 패턴
- StorySection에 `console.log`가 `devLog`로 교체되지 않음

**현재 섹션별 감지 방식**:
| 섹션 | 감지 방식 | 일관성 |
|------|----------|--------|
| HeroSection | `useIsInView` 훅 | ✅ |
| TransitionSection | `useIsInView` 훅 | ✅ |
| MissionSection | 감지 없음 | - |
| StorySection | 직접 Observer | ❌ |
| ProjectsSection | 직접 Observer | ❌ |
| ContactSection | 감지 없음 | - |

**해결 방안**:
1. StorySection: `useIsInView` 훅으로 교체 + `devLog` 적용
2. ProjectsSection: 불필요한 Observer 제거 (콜백이 비어있음)

**우선순위**: Medium

---

## Issue #7 - ProjectsSection 의미 없는 Observer 코드

**날짜**: 2025-12-16

**파일**: `src/sections/ProjectsSection.jsx`

**문제**:
```javascript
// 콜백 내부가 비어있어 아무 동작도 하지 않음
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // ProjectsSection 뷰포트 감지  ← 주석만 있음
    });
  },
  { threshold: [0, 0.1, 0.5, 1.0] }
);
```

**이슈 내용**:
- IntersectionObserver를 생성하지만 콜백이 비어있음
- 불필요한 리소스 사용 (Observer 인스턴스 생성, DOM 감시)
- 죽은 코드(Dead Code)

**해결 방안**:
1. Observer 코드 전체 제거
2. 또는 향후 기능 구현 시 `useIsInView` 훅 사용

**우선순위**: Low

---

## Issue #8 - 테마 전환 시 불필요한 리렌더링 (화면 튀는 현상)

**날짜**: 2025-12-16

**파일**:
- `src/context/BackgroundContext.jsx`
- `src/pages/LandingPage.jsx`
- `src/sections/top/HeroSection.jsx`
- `src/components/commons/BackgroundLayer.jsx`

**문제**:
```javascript
// BackgroundContext.jsx - 매 렌더링마다 새 객체 생성
const backgroundColors = { light: '#ffffff', dark: '#020202' }; // ❌ 컴포넌트 내부 정의
const updateBackgroundMode = (mode) => { ... }; // ❌ useCallback 미적용
const value = { backgroundMode, updateBackgroundMode, ... }; // ❌ useMemo 미적용

// LandingPage.jsx - backgroundMode 구독으로 전체 리렌더링
const { backgroundMode } = useBackground(); // ❌ 불필요한 구독
const textColor = backgroundMode === 'light' ? '#000000' : '#ffffff';

// HeroSection.jsx - backgroundMode 구독으로 중복 리렌더링
const { backgroundMode, updateBackgroundMode } = useBackground();
const textColor = backgroundMode === 'light' ? '#000000' : '#ffffff';
```

**이슈 내용**:
- BackgroundContext의 value 객체가 매 렌더링마다 새로 생성됨
- `updateBackgroundMode` 함수가 메모이제이션 되지 않아 참조 변경
- LandingPage가 `backgroundMode`를 구독 → 테마 변경 시 전체 페이지 리렌더링
- HeroSection도 `backgroundMode`를 구독 → 이중 리렌더링
- 결과: 테마 전환 시 화면이 순간적으로 "튀는" 현상 발생

**리렌더링 캐스케이드**:
```
backgroundMode 변경
    ↓
BackgroundContext value 변경 (새 객체)
    ↓
LandingPage 리렌더링 (backgroundMode 구독)
    ├─ TopSection 리렌더링
    │   ├─ HeroSection 리렌더링 (backgroundMode 구독)
    │   ├─ TransitionSection 리렌더링
    │   └─ MissionSection 리렌더링
    ├─ StorySection 리렌더링
    ├─ ProjectsSection 리렌더링
    └─ ContactSection 리렌더링
```

**해결 방안**:
1. BackgroundContext 최적화
   - 상수를 컴포넌트 외부로 이동
   - `updateBackgroundMode`를 `useCallback`으로 래핑
   - `value` 객체를 `useMemo`로 메모이제이션

2. CSS 커스텀 프로퍼티 활용
   - BackgroundLayer에서 `--theme-text-color` CSS 변수 설정
   - React 상태 대신 CSS로 색상 전환 (리렌더링 불필요)

3. 불필요한 Context 구독 제거
   - LandingPage: `useBackground()` 제거, CSS 변수 사용
   - HeroSection: `backgroundMode` 구독 제거, CSS 변수 사용

4. React.memo 적용
   - HeroSection, TransitionSection을 `memo()`로 래핑

**우선순위**: High

---

## 리팩토링 체크리스트

| # | 이슈 | 우선순위 | 상태 |
|---|------|---------|------|
| 1 | 섹션 디버그 로그 위치 | Medium | [x] 완료 |
| 2 | querySelector 제거 | High | [x] 완료 |
| 3 | 중복 뷰포트 감지 제거 | Medium | [x] 완료 |
| 4 | 프로덕션 console 정리 | Low | [x] 완료 |
| 5 | App.jsx useEffect 분리 | Medium | [x] 완료 |
| 6 | 섹션별 감지 패턴 통일 | Medium | [x] 완료 |
| 7 | ProjectsSection 죽은 코드 제거 | Low | [x] 완료 |
| 8 | 테마 전환 시 불필요한 리렌더링 | High | [x] 완료 |

---

## 리팩토링 완료 내역 (2025-12-16)

### 생성된 파일

1. **`src/utils/logger.js`** - 개발 환경 전용 로거 유틸리티
   - `devLog()` - 개발 환경에서만 console.log 출력
   - `devWarn()` - 개발 환경에서만 console.warn 출력
   - `devError()` - 개발 환경에서만 console.error 출력

2. **`src/hooks/useScrollMonitor.js`** - 전역 스크롤 모니터링 훅
   - Lenis/네이티브 스크롤 충돌 감지
   - ScrollTrigger 핀 상태 모니터링
   - 개발 환경에서만 활성화 옵션

### 수정된 파일

1. **`src/App.jsx`**
   - 140줄 useEffect → 6줄 useScrollMonitor 훅으로 대체
   - querySelector 코드 제거
   - 섹션별 디버그 로그 제거
   - `useEffect` import 제거, `useScrollMonitor` import 추가

2. **`src/sections/top/HeroSection.jsx`**
   - `console.log` → `devLog` 교체

3. **`src/sections/top/TransitionSection.jsx`**
   - `console.log` → `devLog` 교체

4. **`src/hooks/useIsInView.js`**
   - `console.log` → `devLog` 교체

5. **`src/context/BackgroundContext.jsx`**
   - `console.log` → `devLog` 교체
   - 불필요한 stackTrace 로깅 제거

6. **`src/components/patterns/scroll/FreeHorizontalScrollSection.jsx`**
   - `console.log` → `devLog` 교체

7. **`src/sections/StorySection.jsx`** (Issue #6)
   - 직접 IntersectionObserver 구현 → `useIsInView` 훅으로 교체
   - `console.log` → `devLog` 교체
   - 일관된 패턴으로 통일

8. **`src/sections/ProjectsSection.jsx`** (Issue #7)
   - 빈 콜백의 IntersectionObserver 코드 제거
   - 불필요한 `sectionRef`, `useEffect` 제거
   - `data-section` 속성 추가

9. **`src/context/BackgroundContext.jsx`** (Issue #8)
   - `BACKGROUND_COLORS`, `SECTION_PRIORITIES` 상수를 컴포넌트 외부로 이동
   - `updateBackgroundMode`를 `useCallback`으로 래핑
   - `value` 객체를 `useMemo`로 메모이제이션
   - `activeSectionKeys`를 별도 `useMemo`로 분리

10. **`src/components/commons/BackgroundLayer.jsx`** (Issue #8)
    - `--theme-text-color` CSS 커스텀 프로퍼티 설정 추가
    - `--theme-bg-color` CSS 커스텀 프로퍼티 설정 추가
    - React 리렌더링 없이 CSS로 색상 전환 가능

11. **`src/pages/LandingPage.jsx`** (Issue #8)
    - `useBackground()` 구독 제거
    - `color: 'var(--theme-text-color, #000000)'` CSS 변수 사용
    - 테마 전환 시 리렌더링 방지

12. **`src/sections/top/HeroSection.jsx`** (Issue #8)
    - `backgroundMode` 구독 제거 (updateBackgroundMode만 사용)
    - `textColor`를 CSS 변수 `var(--theme-text-color)` 로 변경
    - `React.memo()` 래핑으로 불필요한 리렌더링 방지

13. **`src/sections/top/TransitionSection.jsx`** (Issue #8)
    - `React.memo()` 래핑으로 불필요한 리렌더링 방지

### 코드 변경 요약

**Before (App.jsx)**:
```javascript
import React, { useEffect } from 'react';
import { ScrollTrigger } from './utils/gsapConfig';

// 140줄의 복잡한 useEffect
useEffect(() => {
  // querySelector로 섹션 참조
  // 스크롤 이벤트 핸들러
  // 충돌 감지 로직
  // interval 설정
}, [lenisRef]);
```

**After (App.jsx)**:
```javascript
import React from 'react';
import useScrollMonitor from './hooks/useScrollMonitor';

// 6줄로 간소화
useScrollMonitor(lenisRef, {
  enabled: process.env.NODE_ENV === 'development',
  intervalMs: 10000,
  conflictThreshold: 10,
});
```

---

## 참고: 현재 App.jsx 구조

```javascript
// ✅ 전역 설정
initializeGSAP();
useLenisScroll(...);
useScrollRestoration();
useScrollMonitor(lenisRef, {...}); // 전역 모니터링

// ✅ 전역 Context Provider
<BackgroundProvider>
<SectionRefsProvider>

// ✅ 전역 컴포넌트
<BackgroundLayer />
<CustomTooltipCursor />
```

---

## 현재 섹션별 감지 방식 (통일 완료)

| 섹션 | 감지 방식 | 상태 |
|------|----------|------|
| HeroSection | `useIsInView` 훅 | ✅ |
| TransitionSection | `useIsInView` 훅 | ✅ |
| MissionSection | 감지 없음 | - |
| StorySection | `useIsInView` 훅 | ✅ |
| ProjectsSection | 감지 없음 (필요시 추가) | ✅ |
| ContactSection | 감지 없음 | - |

---

## Issue #8 최적화 후 리렌더링 흐름

```
backgroundMode 변경
    ↓
BackgroundContext value 변경 (useMemo로 최소화)
    ↓
BackgroundLayer만 리렌더링
    ↓
CSS 변수 업데이트 (--theme-text-color)
    ↓
모든 컴포넌트에 CSS로 색상 전파 (React 리렌더링 없음)
```

---

*Last Updated: 2025-12-16*
