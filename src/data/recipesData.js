/**
 * 각 예제 페이지의 레시피 데이터
 */

// 타이포그래피 관련 레시피 데이터 임포트
import {
  scrambleText,
  typingEffect,
  magneticText,
  rotatingText3D,
  scrollStaggerText,
  gradientTypography,
  counterTypography,
  interactiveTypography,
  wordSwitcherTypography,
  fadeInTypography,
} from "./recipes/typography";

import {
  fadeInContainer,
  scrollAwareContainer,
  fadeInGrid,
  cardContainer,
  gradientButton,
  stickyContainer,
  dynamicSortGrid,
  alternatingSlideGrid,
} from "./recipes/motion";

import {
  horizontalScrollSection,
  smoothScroll,
  parallaxScroll,
  isInView,
  scrollDirection,
  fullPageScroll,
} from "./recipes/scroll";

import {
  gridGallery,
  pinnedScrollTransition,
  scrollSectionWithWipe,
  sharedObjectTransition,
  stickySection,
  stickyStackingSections,
} from "./recipes/pageTransition";

import {
  gradientBox,
  meshGradientBox,
  scrollGradientBackground,
} from "./recipes/color";

import {
  animatedPath,
  particleGeneratePath,
  animatedPathWithParticles,
  particleBackground,
  bubbleBackground,
  waveBackground,
} from "./recipes/visualHook";

import {
  cssCursor,
  pointRingCursor,
  spotlightCursor,
  customTooltipCursor,
} from "./recipes/customCursor";

// 그라데이션 팔레트 데이터 임포트
import { gradientPalettes, meshGradientPalettes } from "./gradientPalettes";

// 그라데이션 팔레트 데이터 재내보내기
export { gradientPalettes, meshGradientPalettes };

export const recipesData = {
  // 타이포그래피 레시피 데이터 사용
  scrambleText,
  typingEffect,
  magneticText,
  rotatingText3D,
  scrollStaggerText,
  gradientTypography,
  counterTypography,
  interactiveTypography,
  wordSwitcherTypography,
  fadeInTypography,

  // 모션 레시피 데이터 사용
  fadeInContainer,
  scrollAwareContainer,
  fadeInGrid,
  cardContainer,
  gradientButton,
  stickyContainer,
  dynamicSortGrid,
  alternatingSlideGrid,

  // 스크롤 레시피 데이터 사용
  horizontalScrollSection,
  smoothScroll,
  parallaxScroll,
  isInView,
  scrollDirection,
  fullPageScroll,

  // 페이지 전환 레시피 데이터 사용
  gridGallery,
  pinnedScrollTransition,
  scrollSectionWithWipe,
  sharedObjectTransition,
  stickySection,
  stickyStackingSections,

  // 색상 레시피 데이터 사용
  gradientBox,
  meshGradientBox,
  scrollGradientBackground,

  // 비주얼 훅 레시피 데이터 사용
  animatedPath,
  particleGeneratePath,
  animatedPathWithParticles,
  particleBackground,
  bubbleBackground,
  waveBackground,

  // 커스텀 커서 레시피 데이터 사용
  cssCursor,
  pointRingCursor,
  spotlightCursor,
  customTooltipCursor,
};

/**
 * 패턴 및 컴포넌트 통합 데이터
 * 패턴 카테고리와 해당 패턴의 컴포넌트 목록을 관리합니다.
 */
export const patternsData = {
  typography: {
    title: "Typography",
    path: "/typing-effect",
    description: "타이포그래피와 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Typing Effect",
        path: "/typing-effect",
        description:
          "텍스트가 한 글자씩 입력되는 것처럼 순차적으로 나타났다 사라지는 타이핑 애니메이션을 구현합니다.",
        recipeData: recipesData.typingEffect,
      },
      {
        title: "Scramble Text",
        path: "/scramble-text",
        description:
          "텍스트를 랜덤 문자로 변경했다가 원래 텍스트로 되돌리는 애니메이션 효과를 구현합니다.",
        recipeData: recipesData.scrambleText,
      },
      {
        title: "Magnetic Text",
        path: "/magnetic-text",
        description:
          "마우스를 가까이 가져갔을 때 텍스트가 자석처럼 커서 방향으로 끌려오는 인터랙티브 효과를 구현합니다.",
        recipeData: recipesData.magneticText,
      },
      {
        title: "Rotating Text 3D",
        path: "/rotating-text-3d",
        description:
          "3D 공간에서 텍스트를 회전시키고 마우스 호버 시 정렬되는 입체적인 텍스트 효과를 구현합니다.",
        recipeData: recipesData.rotatingText3D,
      },
      {
        title: "Scroll Stagger Text",
        path: "/scroll-stagger-text",
        description:
          "스크롤에 따라 텍스트가 순차적으로 나타나는 시차 애니메이션 효과를 구현합니다.",
        recipeData: recipesData.scrollStaggerText,
      },
      {
        title: "Gradient Typography",
        path: "/gradient-typography",
        description:
          "텍스트에 그라데이션을 적용하고 마우스 움직임에 따라 반응하는 동적 효과를 구현합니다.",
        recipeData: recipesData.gradientTypography,
      },
      {
        title: "Counter Typography",
        path: "/counter-typography",
        description:
          "숫자를 시간에 따라 애니메이션으로 증가/감소시키며 단위와 함께 표시하는 효과를 구현합니다.",
        recipeData: recipesData.counterTypography,
      },
      {
        title: "Interactive Typography",
        path: "/interactive-typography",
        description:
          "마우스 커서 위치에 따라 글자의 굵기와 크기가 동적으로 변하는 인터랙티브 효과를 구현합니다.",
        recipeData: recipesData.interactiveTypography,
      },
      {
        title: "Word Switcher Typography",
        path: "/word-switcher",
        description:
          "여러 단어 목록을 보여줄 때 스크램블 효과와 함께 단어가 전환되는 애니메이션을 구현합니다.",
        recipeData: recipesData.wordSwitcherTypography,
      },
      {
        title: "Fade In Typography",
        path: "/fade-in-typography",
        description:
          "문장을 단어별로 순차적으로 나타나게 하여 텍스트에 동적인 등장 효과를 제공합니다.",
        recipeData: recipesData.fadeInTypography,
      },
    ],
  },
  motion: {
    title: "Motion",
    path: "/fade-in-container",
    description: "모션과 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Fade In Container",
        path: "/fade-in-container",
        description:
          "요소가 화면에 보일 때 페이드 인과 이동 애니메이션 효과를 자연스럽게 적용합니다.",
        recipeData: recipesData.fadeInContainer,
      },
      {
        title: "Fade In Grid",
        path: "/fade-in-grid",
        description:
          "Grid 아이템들이 순차적으로 나타나는 시차 애니메이션 효과를 적용합니다.",
        recipeData: recipesData.fadeInGrid,
      },
      {
        title: "Scroll Aware Container",
        path: "/scroll-aware-container",
        description:
          "스크롤 방향에 따라 컨텐츠를 자동으로 숨기거나 표시하는 스마트한 컨테이너를 구현합니다.",
        recipeData: recipesData.scrollAwareContainer,
      },
      {
        title: "Card Container",
        path: "/card-container",
        description:
          "다양한 호버 효과와 애니메이션이 적용된 인터랙티브한 카드 UI 컴포넌트를 구현합니다.",
        recipeData: recipesData.cardContainer,
      },
      {
        title: "Gradient Button",
        path: "/gradient-button",
        description:
          "CTA를 유도하기 위해 애니메이션이 적용된 선형 그라디언트 배경의 버튼을 구현합니다.",
        recipeData: recipesData.gradientButton,
      },
      {
        title: "Sticky Container",
        path: "/sticky-container",
        description:
          "스크롤 시 특정 요소를 상단 또는 하단에 고정(sticky)하는 컨테이너를 구현합니다.",
        recipeData: recipesData.stickyContainer,
      },
      {
        title: "Dynamic Sort Grid",
        path: "/dynamic-sort-grid",
        description:
          "정렬 옵션에 따라 그리드 아이템이 애니메이션과 함께 실시간으로 재정렬되는 기능을 구현합니다.",
        recipeData: recipesData.dynamicSortGrid,
      },
      // {
      // 	title: "Alternating Slide Grid",
      // 	path: "/alternating-slide-grid",
      // 	description:
      // 		"그리드 아이템들이 좌우에서 번갈아가며 슬라이드되어 나타나는 시차 애니메이션을 구현합니다.",
      // 	recipeData: recipesData.alternatingSlideGrid,
      // },
    ],
  },
  scroll: {
    title: "Scroll",
    path: "/horizontal-scroll-section",
    description: "스크롤과 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Horizontal Scroll Section",
        path: "/horizontal-scroll-section",
        description:
          "세로 스크롤을 하면서도 특정 섹션에서는 컨텐츠가 수평으로 스크롤되는 효과를 구현합니다.",
        recipeData: recipesData.horizontalScrollSection,
      },
      {
        title: "Smooth Scroll",
        path: "/smooth-scroll",
        description:
          "페이지 내의 특정 구간으로 부드럽게 스크롤되는 네비게이션 기능을 구현합니다.",
        recipeData: recipesData.smoothScroll,
      },
      {
        title: "Parallax Scroll",
        path: "/parallax-scroll",
        description:
          "스크롤 시 요소들이 서로 다른 속도로 움직이며 깊이감을 만드는 효과를 구현합니다.",
        recipeData: recipesData.parallaxScroll,
      },
      {
        title: "Is In View",
        path: "/is-in-view",
        description:
          "요소가 화면에 보이는 비율에 따라 서로 다른 애니메이션을 적용하는 기능을 구현합니다.",
        recipeData: recipesData.isInView,
      },
      {
        title: "Scroll Direction",
        path: "/scroll-direction",
        description:
          "스크롤 방향(위/아래)에 따라 UI 요소를 숨기거나 표시하는 기능을 구현합니다.",
        recipeData: recipesData.scrollDirection,
      },
      {
        title: "Full Page Scroll",
        path: "/full-page-scroll",
        description:
          "섹션별로 전체 화면 단위로 부드럽게 스크롤하는 원페이지 웹사이트를 구현합니다.",
        recipeData: recipesData.fullPageScroll,
      },
    ],
  },
  pageTransition: {
    title: "Page Transition",
    path: "/sticky-section",
    description: "페이지 간 전환 및 섹션 전환과 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Sticky Section",
        path: "/sticky-section",
        description:
          "스크롤할 때 특정 섹션이 화면에 고정되어 있다가 축소되며, 배경으로 이미지, 색상 또는 React 컴포넌트를 활용할 수 있습니다.",
        recipeData: recipesData.stickySection,
      },
      {
        title: "Scroll Section With Wipe",
        path: "/scroll-section-with-wipe",
        description: "스크롤 시 와이프 효과로 섹션 간 전환을 구현하는 컴포넌트",
        recipeData: recipesData.scrollSectionWithWipe,
      },
      {
        title: "Sticky Stacking Sections",
        path: "/sticky-stacking-sections",
        description:
          "스크롤 시 섹션이 상단에 고정되고 다음 섹션이 위에서 덮는 스택 효과",
        recipeData: recipesData.stickyStackingSections,
      },
      {
        title: "Pinned Scroll Transition",
        path: "/pinned-scroll-transition",
        description:
          "스크롤 시 섹션이 고정되고 내부 콘텐츠만 애니메이션되는 전환 효과",
        recipeData: recipesData.pinnedScrollTransition,
      },
      {
        title: "Shared Object Transition",
        path: "/shared-object-transition",
        description:
          "목록 페이지와 상세 페이지 간 요소가 자연스럽게 이어지는 페이지 전환 효과",
        recipeData: recipesData.sharedObjectTransition,
      },
      {
        title: "Grid Gallery",
        path: "/grid-gallery",
        description:
          "그리드 형태로 배열된 이미지를 클릭하면 콘텐츠와 함께 확대되는 갤러리 컴포넌트",
        recipeData: recipesData.gridGallery,
      },
    ],
  },
  color: {
    title: "Color & Gradient",
    path: "/gradient-box",
    description: "색과 그라데이션과 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Gradient Box",
        path: "/gradient-box",
        description:
          "CSS를 직접 수정하지 않고도 MUI 스타일 체계 내에서 다양한 그라데이션 배경을 쉽게 만들 수 있는 컴포넌트입니다.",
        recipeData: recipesData.gradientBox,
      },
      {
        title: "Mesh Gradient Box",
        path: "/mesh-gradient-box",
        description:
          "CSS를 직접 수정하지 않고도 MUI 스타일 체계 내에서 복잡한 메시 형태의 그라데이션 배경을 생성하는 컴포넌트입니다.",
        recipeData: recipesData.meshGradientBox,
      },
      {
        title: "Scroll Gradient Background",
        path: "/scroll-gradient-background",
        description:
          "스크롤 진행도에 따라 여러 색상 단계로 부드럽게 전환되는 전체 화면 배경 그라데이션 컴포넌트입니다.",
        recipeData: recipesData.scrollGradientBackground,
      },
    ],
  },
  visualHook: {
    title: "Visual Hook",
    path: "/animated-path",
    description:
      "three.js, svg를 활용한 시각적 훅과 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Animated Path",
        path: "/animated-path",
        description:
          "SVG path를 stroke-dasharray 애니메이션으로 그려나가는 효과를 제공하여 선이 손으로 그리듯이 나타나는 시각적 효과를 구현합니다.",
        recipeData: recipesData.animatedPath,
      },
      {
        title: "Particle Generate Path",
        path: "/particle-generate-path",
        description:
          "SVG path를 따라 파티클이 생성되고 움직이며 색상이 변화하는 시각적 효과를 제공하여 동적이고 화려한 그래픽 요소를 구현합니다.",
        recipeData: recipesData.particleGeneratePath,
      },
      {
        title: "Animated Path With Particles",
        path: "/animated-path-with-particles",
        description:
          "SVG path가 그려지면서 동시에 파티클 효과도 함께 나타나는 결합된 시각적 효과를 제공하여 더욱 역동적이고 인상적인 애니메이션을 구현합니다.",
        recipeData: recipesData.animatedPathWithParticles,
      },
      {
        title: "Particle Background",
        path: "/particle-background",
        description:
          "3D 공간에서 마우스와 스크롤에 반응하는 파티클들이 배경을 이루는 인터랙티브 효과를 제공하여 몰입형 사용자 경험을 구현합니다.",
        recipeData: recipesData.particleBackground,
      },
      {
        title: "Bubble Background",
        path: "/bubble-background",
        description:
          "3D 공간에서 스크롤에 반응하며 위로 떠오르는 투명한 버블들이 배경을 이루는 인터랙티브 효과를 제공하여 몰입형 웹 경험을 구현합니다.",
        recipeData: recipesData.bubbleBackground,
      },
      {
        title: "Wave Background",
        path: "/wave-background",
        description:
          "3D 공간에서 스크롤과 마우스에 반응하는 동적인 물결이 배경을 이루는 인터랙티브 효과를 제공하여 몰입형 웹 경험을 구현합니다.",
        recipeData: recipesData.waveBackground,
      },
    ],
  },
  customCursor: {
    title: "Custom Cursor",
    path: "/point-ring-cursor",
    description: "커스텀 마우스 커서와 관련된 인터랙티브 패턴 예시들",
    componentList: [
      {
        title: "Point Ring Cursor",
        path: "/point-ring-cursor",
        description:
          "작은 점과 바깥 링으로 구성된 커서로, 0.05초 지연으로 따라오며 클릭 시 탄성 스케일 애니메이션이 적용됩니다.",
        recipeData: recipesData.pointRingCursor,
      },
      {
        title: "Spotlight Cursor",
        path: "/spotlight-cursor",
        description:
          "마우스 위치를 중심으로 원형 마스킹을 적용하여 해당 영역만 밝게 표시하고 나머지는 어둡게 만드는 스포트라이트 효과입니다.",
        recipeData: recipesData.spotlightCursor,
      },
      {
        title: "CSS Cursor",
        path: "/css-cursor",
        description:
          "CSS cursor 속성을 활용하여 웹사이트의 마우스 커서를 커스텀 이미지로 변경하는 기능을 구현합니다.",
        recipeData: recipesData.cssCursor,
      },
      {
        title: "Custom Tooltip Cursor",
        path: "/custom-tooltip-cursor",
        description:
          "마우스를 따라다니는 'O' 형태의 커서로, 클릭 시 'D' 모양으로 변하며 특정 요소에 마우스 오버 시 툴팁 정보를 표시하는 인터랙티브 커서입니다.",
        recipeData: recipesData.customTooltipCursor,
      },
    ],
  },
};
