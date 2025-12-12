export const gridGallery = {
  title: "Grid Gallery",
  basicIdea:
    "그리드 형태로 배치된 이미지들을 클릭하면 전체 화면으로 확대되며, 부드러운 애니메이션과 함께 상세 내용을 표시합니다.",
  examples: ["포트폴리오 갤러리", "제품 쇼케이스", "이미지 갤러리"],
  expectedPrompt: "그리드 갤러리를 만들어줘. 이미지 배열, 열 수, 간격, 이미지 비율, 확대 시 오버레이 컨텐츠를 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 그리드의 이미지를 클릭할 때",
    "2. 무엇을: 선택된 이미지를",
    "3. 어떻게: 전체 화면으로 부드럽게 확대하며 상세 정보와 함께 표시",
  ],
  advancedLearning: {
    propsList: [
      { name: "images", type: "array", description: "표시할 이미지 객체 배열 (src, content, contentPosition 포함)", required: true },
      { name: "columns", type: "number", description: "그리드 열 수", required: false, default: 3 },
      { name: "gap", type: "string", description: "그리드 간격", required: false, default: "1rem" },
      { name: "aspectRatio", type: "string", description: "이미지 비율 (예: '4 / 3')", required: false, default: "4 / 3" },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion layoutId",
        role: "같은 요소 간의 부드러운 애니메이션 전환을 위한 식별자",
        type: "React",
      },
      {
        name: "AnimatePresence",
        role: "컴포넌트가 DOM에서 제거될 때 애니메이션 적용",
        type: "React",
      },
      {
        name: "CSS Grid Layout",
        role: "이미지들을 격자 형태로 배치하는 레이아웃 시스템",
        type: "CSS",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 그리드에 배치된 이미지 중 하나를 클릭할 때",
    interactiveTarget: "클릭된 이미지와 전체 화면 오버레이",
    interactiveProperty: "이미지가 원래 위치에서 전체 화면으로 부드럽게 확대되며, 오버레이 컨텐츠가 나타남"
  },
};

export const pinnedScrollTransition = {
  title: "Pinned Scroll Transition",
  basicIdea:
    "스크롤 중 특정 섹션이 화면에 고정되고, 여러 콘텐츠가 페이드 효과로 순차적으로 전환됩니다.",
  examples: ["스토리텔링", "제품 소개", "단계별 프레젠테이션", "인트로 시퀀스"],
  expectedPrompt: "스크롤 시 화면에 고정된 섹션에서 여러 콘텐츠가 페이드로 전환되는 효과를 만들어줘. 전환할 섹션 배열, 고정 지속 시간, 배경색, 진행 표시기, 섹션 변경 콜백을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 고정 섹션에 도달하여 계속 스크롤할 때",
    "2. 무엇을: 배열로 전달된 여러 콘텐츠들을",
    "3. 어떻게: 스크롤 진행률에 따라 순차적으로 페이드 인/아웃하며 전환",
  ],
  advancedLearning: {
    propsList: [
      { name: "sections", type: "array", description: "전환할 컨텐츠 섹션 배열 (ReactNode[])", required: true },
      { name: "duration", type: "number", description: "고정 상태 유지 스크롤 거리(px)", required: false, default: 1200 },
      { name: "scrub", type: "boolean", description: "스크롤 위치에 애니메이션 동기화 여부", required: false, default: true },
      { name: "start", type: "string", description: "고정 시작 위치 (ScrollTrigger 형식)", required: false, default: "top top" },
      { name: "backgroundColor", type: "color", description: "고정 섹션의 배경색", required: false, default: "#000" },
      { name: "showProgress", type: "boolean", description: "진행 상태 표시기 표시 여부", required: false, default: false },
      { name: "onSectionChange", type: "function", description: "섹션 변경 시 호출되는 콜백 함수", required: false },
    ],
    requiredKnowledge: [
      {
        name: "GSAP ScrollTrigger Progress",
        role: "스크롤 진행률을 계산하고 이를 기반으로 애니메이션을 제어하는 기능",
        type: "JavaScript",
      },
      {
        name: "Opacity Transitions",
        role: "여러 요소의 투명도를 동시에 제어하여 크로스페이드 효과 구현",
        type: "CSS",
      },
      {
        name: "Array Mapping & Refs",
        role: "배열 데이터를 컴포넌트로 렌더링하고 각 요소의 참조를 관리",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 고정 섹션에 도달한 후 계속 스크롤할 때",
    interactiveTarget: "고정된 섹션 내의 여러 콘텐츠 레이어",
    interactiveProperty: "각 콘텐츠가 스크롤 진행률에 따라 페이드 인/아웃되며 다음 콘텐츠로 전환됨"
  },
};

export const scrollSectionWithWipe = {
  title: "Scroll Section With Wipe",
  basicIdea:
    "스크롤에 따라 와이프(닦아내기) 효과로 섹션이 전환되며 새로운 콘텐츠가 나타납니다.",
  examples: ["페이지 전환", "섹션 구분", "시각적 전환 효과"],
  expectedPrompt: "스크롤 시 와이프 효과로 새로운 섹션이 나타나도록 만들어줘. 와이프 방향, 색상, 투명도, 애니메이션 속도, 컨텐츠 지연을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 특정 섹션에 스크롤해서 진입할 때",
    "2. 무엇을: 색상 오버레이가",
    "3. 어떻게: 설정된 방향으로 닦아내듯 사라지며 새로운 컨텐츠를 드러냄",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "섹션에 표시할 컨텐츠", required: true },
      { name: "wipeDirection", type: "select", description: "와이프 방향", required: false, default: "left", options: ["left", "right"] },
      { name: "wipeColor", type: "string", description: "와이프 오버레이 색상", required: false, default: "#000000" },
      { name: "wipeOpacity", type: "number", description: "와이프 오버레이 불투명도", required: false, default: 0.8 },
      { name: "wipeDuration", type: "number", description: "와이프 애니메이션 지속 시간(초)", required: false, default: 0.5 },
      { name: "contentDelay", type: "number", description: "컨텐츠 표시 지연 시간(초)", required: false, default: 0.2 },
    ],
    requiredKnowledge: [
      {
        name: "Intersection Observer API",
        role: "요소가 화면에 진입하는 시점을 감지하는 브라우저 API",
        type: "JavaScript",
      },
      {
        name: "CSS Transform",
        role: "요소의 위치와 크기를 변경하는 CSS 속성",
        type: "CSS",
      },
      {
        name: "CSS Transition",
        role: "속성 변화를 부드럽게 애니메이션하는 CSS 기능",
        type: "CSS",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 스크롤해서 섹션이 화면에 진입할 때",
    interactiveTarget: "섹션 전체와 와이프 오버레이",
    interactiveProperty: "오버레이가 설정된 방향으로 슬라이드되며 사라지고, 컨텐츠가 페이드인됨"
  },
};

export const sharedObjectTransition = {
  title: "Shared Object Transition",
  basicIdea:
    "목록 페이지의 썸네일과 상세 페이지의 이미지 간에 부드러운 전환 애니메이션을 제공합니다.",
  examples: ["갤러리 앱", "쇼핑몰", "포트폴리오"],
  expectedPrompt: "목록에서 상세 페이지로 이동할 때 썸네일이 부드럽게 확대되는 전환 효과를 만들어줘. 아이템 ID, 이미지 URL, 상세 경로, 제목을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 목록의 썸네일을 클릭할 때",
    "2. 무엇을: 클릭된 썸네일 이미지를",
    "3. 어떻게: 원래 위치에서 상세 페이지의 전체 화면으로 부드럽게 확대",
  ],
  advancedLearning: {
    propsList: [
      { name: "itemId", type: "string", description: "아이템의 고유 ID", required: true },
      { name: "imageUrl", type: "string", description: "이미지 URL", required: true },
      { name: "detailPath", type: "string", description: "상세 페이지 경로", required: true },
      { name: "title", type: "string", description: "썸네일 제목", required: false },
      { name: "onBack", type: "function", description: "뒤로가기 버튼 클릭 시 실행할 함수", required: true },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion layoutId",
        role: "페이지 간 같은 요소의 연속성을 위한 고유 식별자",
        type: "React",
      },
      {
        name: "React Router",
        role: "페이지 간 네비게이션과 상태 전달을 위한 라우팅 라이브러리",
        type: "React",
      },
      {
        name: "getBoundingClientRect",
        role: "요소의 정확한 화면 위치와 크기를 계산하는 DOM API",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 목록 페이지의 썸네일을 클릭할 때",
    interactiveTarget: "클릭된 썸네일과 상세 페이지의 확대된 이미지",
    interactiveProperty: "썸네일이 원래 위치에서 상세 페이지의 위치로 부드럽게 이동하고 확대됨"
  },
};

export const stickySection = {
  title: "Sticky Section",
  basicIdea:
    "스크롤에 따라 축소되는 스티키 섹션으로, 화면에 고정된 영역이 스크롤에 따라 부드럽게 축소되는 효과를 제공합니다.",
  examples: ["서비스 소개 페이지", "제품 기능 소개", "앱 설명 페이지"],
  expectedPrompt: "스크롤 시 축소되는 고정 섹션을 만들어줘. 축소 비율, 배경색/이미지, 페이드 효과, 최종 투명도를 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 섹션을 지나 스크롤할 때",
    "2. 무엇을: 고정된 섹션을",
    "3. 어떻게: 점진적으로 축소시키고 투명도를 조절하며",
  ],
  advancedLearning: {
    propsList: [
      { name: "targetScale", type: "number", description: "최종 축소 비율", required: false, default: 0.8 },
      { name: "backgroundColor", type: "string", description: "배경 색상", required: false, default: "#0000ff" },
      { name: "image", type: "string", description: "배경 이미지 URL", required: false },
      { name: "backgroundComponent", type: "node", description: "배경으로 사용될 컴포넌트", required: false },
      { name: "children", type: "node", description: "섹션 내부 컨텐츠", required: false },
      { name: "msg", type: "node", description: "섹션에 표시할 메시지", required: false },
      { name: "content", type: "node", description: "섹션 아래 추가 컨텐츠", required: false },
      { name: "useFadeEffect", type: "boolean", description: "페이드 인 효과 사용 여부", required: false, default: false },
      { name: "targetOpacity", type: "number", description: "최종 투명도", required: false, default: 0.3 },
    ],
    requiredKnowledge: [
      {
        name: "CSS Transform Scale",
        role: "요소의 크기를 동적으로 변경하는 CSS 변환",
        type: "CSS",
      },
      {
        name: "Sticky Positioning",
        role: "스크롤 시 요소를 화면의 특정 위치에 고정",
        type: "CSS",
      },
      {
        name: "Scroll Event Handling",
        role: "스크롤 위치를 추적하고 progress를 계산하는 로직",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 스티키 섹션을 지나 계속 스크롤할 때",
    interactiveTarget: "고정된 섹션 전체",
    interactiveProperty: "섹션이 점진적으로 축소되고 투명해지며, 설정된 최종 상태에 도달"
  },
};

export const stickyStackingSections = {
  title: "Sticky Stacking Sections",
  basicIdea:
    "스크롤 시 여러 섹션이 상단에 차례로 고정되며, 다음 섹션이 위에서 덮어가는 스택 효과를 제공합니다.",
  examples: ["스토리 진행", "단계별 설명", "타임라인"],
  expectedPrompt: "스크롤 시 섹션들이 차례로 고정되고 다음 섹션이 위에서 덮어가는 스택 효과를 만들어줘. 섹션 배열, 섹션 높이, z-index 기준값을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 연속된 섹션들을 스크롤할 때",
    "2. 무엇을: 각 섹션을",
    "3. 어떻게: 상단에 차례로 고정시키고 다음 섹션이 위에서 덮어가도록",
  ],
  advancedLearning: {
    propsList: [
      { name: "sections", type: "array", description: "렌더링할 섹션 목록 (ReactNode 배열)", required: true },
      { name: "className", type: "string", description: "외부 스타일 확장용 클래스", required: false },
      { name: "sectionHeight", type: "string", description: "각 섹션의 높이", required: false, default: "100vh" },
      { name: "zIndexBase", type: "number", description: "초기 z-index 기준값", required: false, default: 10 },
      { name: "enableMotion", type: "boolean", description: "Framer Motion 사용 여부", required: false, default: false },
    ],
    requiredKnowledge: [
      {
        name: "CSS Stacking Context",
        role: "z-index를 통한 요소들의 겹침 순서 관리",
        type: "CSS",
      },
      {
        name: "Multiple Sticky Elements",
        role: "여러 요소를 동시에 sticky로 만들 때의 동작 원리",
        type: "CSS",
      },
      {
        name: "Array Rendering",
        role: "React에서 배열 데이터를 컴포넌트로 렌더링하는 방법",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 여러 섹션을 연속으로 스크롤할 때",
    interactiveTarget: "각각의 섹션",
    interactiveProperty: "각 섹션이 상단에 고정되고, 다음 섹션이 위에서 내려와 이전 섹션을 덮어감"
  },
}; 