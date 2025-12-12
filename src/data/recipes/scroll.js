export const horizontalScrollSection = {
  title: "Horizontal Scroll Section",
  basicIdea:
    "수직 스크롤을 하면서도 특정 섹션에서는 컨텐츠가 수평으로 스크롤되는 효과를 구현합니다.",
  examples: ["제품 갤러리", "포트폴리오", "스토리텔링"],
  expectedPrompt: "세로 스크롤을 할 때 특정 섹션에서는 가로로 스크롤되는 효과를 만들어줘. 섹션 높이, 배경색, 아이템 너비, 아이템 간 간격, 모션 블러 효과를 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 세로 스크롤을 할 때",
    "2. 무엇을: 특정 섹션의 내부 컨텐츠를",
    "3. 어떻게: 가로 방향으로 이동하며 나타나게",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "가로로 배치될 컨텐츠 요소들", required: true },
      { name: "height", type: "string", description: "섹션의 높이", required: false, default: "100vh" },
      { name: "backgroundColor", type: "string", description: "섹션 배경색", required: false },
      { name: "itemWidth", type: "string", description: "각 아이템의 너비 (퍼센트 또는 픽셀)", required: false, default: "60%" },
      { name: "gap", type: "number", description: "아이템 간 간격 (픽셀)", required: false, default: 20 },
      { name: "scrubValue", type: "number", description: "스크롤 감도 (값이 클수록 부드러움)", required: false, default: 1 },
      { name: "enableMotionBlur", type: "boolean", description: "모션 블러 효과 활성화 여부", required: false, default: true },
      { name: "motionBlurIntensity", type: "number", description: "모션 블러 강도 배율", required: false, default: 1.0 },
      { name: "sectionTitle", type: "string", description: "섹션 제목", required: false },
      { name: "scroller", type: "string", description: "스크롤 컨테이너 ('auto' 또는 특정 요소)", required: false, default: "auto" },
    ],
    requiredKnowledge: [
      {
        name: "GSAP ScrollTrigger",
        role: "수직 스크롤을 가로 스크롤로 변환하는 애니메이션 라이브러리",
        type: "JavaScript",
      },
      {
        name: "Transform 속성",
        role: "요소의 위치를 실시간으로 이동시키는 CSS 변환",
        type: "CSS",
      },
      {
        name: "Refs와 Effects",
        role: "DOM 요소에 직접 접근하고 스크롤 이벤트를 관리",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 세로 스크롤을 할 때, 특정 섹션에 도달하면",
    interactiveTarget: "섹션 내부의 컨텐츠 컨테이너",
    interactiveProperty: "컨테이너가 가로 방향으로 이동하며, 세로 스크롤 양에 비례하여 위치가 변화함"
  },
  requiredKnowledge: [
    {
      name: "JavaScript (Scroll Events)",
      role: "수직 스크롤 동작을 감지하고 스크롤 양을 측정",
      type: "js",
    },
    {
      name: "React (Refs and Effects)",
      role: "DOM 요소 직접 조작 및 스크롤 이벤트 관리",
      type: "react",
    },
    {
      name: "CSS (Sticky Positioning)",
      role: "특정 섹션이 스크롤 중에도 화면에 고정되도록 설정",
      type: "css",
    },
    {
      name: "JavaScript (Transform Calculations)",
      role: "수직 스크롤 양을 수평 이동 거리로 변환하는 계산 로직",
      type: "js",
    },
    {
      name: "Layout (Horizontal Container)",
      role: "내부 요소들이 수평으로 나열되고 충분한 너비를 가진 컨테이너 구성",
      type: "css",
    },
  ],
};

export const smoothScroll = {
  title: "Smooth Scroll",
  basicIdea:
    "페이지 내의 특정 구간으로 부드럽게 스크롤되는 기능을 구현합니다.",
  examples: ["원페이지 웹사이트", "앵커 링크", "목차"],
  expectedPrompt: "부드러운 스크롤 효과를 적용해줘. 스크롤 지속 시간, 방향, 마우스 휠 부드러움, 터치 스크롤 처리를 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 스크롤하거나 특정 링크를 클릭할 때",
    "2. 무엇을: 페이지 전체 또는 특정 영역을",
    "3. 어떻게: 부드럽고 자연스러운 속도로 이동시키며",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "스크롤 컨테이너에 포함될 요소들", required: true },
      { name: "enabled", type: "boolean", description: "스크롤 효과 활성화 여부", required: false, default: true },
      { name: "duration", type: "number", description: "스크롤 애니메이션 지속 시간(초)", required: false, default: 1.2 },
      { name: "orientation", type: "select", description: "스크롤 방향", required: false, default: "vertical", options: ["vertical", "horizontal"] },
      { name: "smoothWheel", type: "boolean", description: "마우스 휠 부드럽게 처리", required: false, default: true },
      { name: "smoothTouch", type: "boolean", description: "터치 스크롤 부드럽게 처리", required: false, default: false },
      { name: "wheelMultiplier", type: "number", description: "휠 스크롤 속도 배수", required: false, default: 1 },
      { name: "onScroll", type: "function", description: "스크롤 이벤트 핸들러", required: false },
    ],
    requiredKnowledge: [
      {
        name: "Lenis 라이브러리",
        role: "부드러운 스크롤 애니메이션을 제공하는 전문 라이브러리",
        type: "JavaScript",
      },
      {
        name: "Custom Hooks",
        role: "스크롤 로직을 재사용 가능하게 분리하는 React 패턴",
        type: "React",
      },
      {
        name: "이벤트 핸들링",
        role: "스크롤 이벤트를 감지하고 적절한 콜백 함수 실행",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 스크롤하거나 페이지 내 링크를 클릭할 때",
    interactiveTarget: "페이지 전체 또는 특정 스크롤 영역",
    interactiveProperty: "스크롤 속도가 부드럽게 변화하며, 급작스러운 움직임 대신 자연스러운 가속과 감속이 적용됨"
  },
  requiredKnowledge: [
    {
      name: "JavaScript (Smooth Scroll API or Library)",
      role: "부드러운 스크롤 애니메이션 효과를 쉽게 구현",
      type: "js/library",
    },
    {
      name: "JavaScript (Element Positioning and Offsets)",
      role: "목표 섹션의 페이지 내 위치(스크롤 좌표) 파악",
      type: "js",
    },
    {
      name: "JavaScript (Click Events)",
      role: "링크 클릭 감지 및 기본 동작 방지",
      type: "js",
    },
    {
      name: "Animation (Easing Functions)",
      role: "스크롤 속도가 자연스럽게 변하는 부드러운 움직임 효과 설정",
      type: "js",
    },
    {
      name: "React (Refs)",
      role: "스크롤 대상이 되는 DOM 요소 참조하기",
      type: "react",
    },
  ],
};

export const parallaxScroll = {
  title: "Parallax Scroll",
  basicIdea:
    "스크롤할 때 배경과 전경이 서로 다른 속도로 움직여 입체적인 깊이감을 만드는 효과.",
  examples: ["랜딩 페이지", "스토리텔링", "배경 효과"],
  expectedPrompt: "스크롤 시 레이어들이 다른 속도로 움직이는 시차 효과를 만들어줘. 컨테이너의 최대 깊이, 각 레이어의 깊이 값, 하단 콘텐츠와의 거리 자동 보정을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 페이지를 스크롤할 때",
    "2. 무엇을: 여러 개의 레이어를",
    "3. 어떻게: 각각 다른 속도로 움직여 깊이감을 연출하며",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "패럴럭스 컨테이너에 포함될 레이어들", required: true },
      { name: "maxZ", type: "number", description: "패럴럭스 효과의 최대 Z값 (깊이 범위)", required: false, default: 10 },
      { name: "className", type: "string", description: "컨테이너에 추가할 CSS 클래스", required: false },
      { name: "style", type: "object", description: "컨테이너 인라인 스타일 객체", required: false },
      { name: "depthZ", type: "number", description: "레이어의 Z축 깊이 값 (0~maxZ)", required: false, default: 0 },
    ],
    requiredKnowledge: [
      {
        name: "동적 마진 보정",
        role: "패럴럭스 효과로 인한 레이어 이동을 보상하여 하단 콘텐츠와의 거리를 자동 조정",
        type: "JavaScript",
      },
      {
        name: "Intersection Observer",
        role: "컨테이너의 뷰포트 진입/이탈 상태를 감지하여 보정 시점을 제어",
        type: "JavaScript",
      },
      {
        name: "Context API",
        role: "부모에서 자식 컴포넌트로 스크롤 정보와 translateY 수집 함수를 전달",
        type: "React",
      },
      {
        name: "실시간 값 추적",
        role: "각 레이어의 translateY 값을 실시간으로 수집하고 최소값을 계산하는 로직",
        type: "JavaScript",
      },
      {
        name: "Lenis 스크롤 연동",
        role: "부드러운 스크롤 라이브러리와의 이벤트 구독 및 fallback 처리",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 페이지를 세로로 스크롤할 때, 패럴럭스 컨테이너가 화면에 보이는 동안",
    interactiveTarget: "배경, 중간, 전경 등 깊이가 다른 여러 레이어",
    interactiveProperty: "각 레이어가 깊이 값에 따라 서로 다른 속도로 수직 이동하며, 하단 콘텐츠와의 거리가 자동으로 보정됨"
  },
  requiredKnowledge: [
    {
      name: "JavaScript (Scroll Events and Position Tracking)",
      role: "스크롤 위치 값을 실시간으로 가져오고 활용",
      type: "js",
    },
    {
      name: "Animation Library (Framer Motion - useScroll, useTransform)",
      role: "스크롤 위치에 따라 각 레이어의 위치를 부드럽게 변환",
      type: "library",
    },
    {
      name: "CSS (Positioning and Stacking Contexts)",
      role: "레이어 간의 상대적인 위치와 겹침 순서 설정",
      type: "css",
    },
    {
      name: "React (Refs, Effects)",
      role: "DOM 요소 직접 조작 및 스크롤 이벤트 관리",
      type: "react",
    },
    {
      name: "Performance Optimization (Throttling/Animation Frames)",
      role: "빈번한 스크롤 이벤트 처리를 최적화하여 성능 개선",
      type: "js",
    },
  ],
};

export const isInView = {
  title: "Is In View",
  basicIdea:
    "요소가 화면에 보이는 비율에 따라 서로 다른 애니메이션을 적용하는 기능을 구현합니다.",
  examples: ["진행 상태 표시", "읽음 추적", "애니메이션 트리거"],
  expectedPrompt: "요소가 화면에 보이는 정도에 따라 다른 애니메이션을 적용해줘. 가시성 임계값, 진입/퇴장 애니메이션을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 요소가 화면 영역에 들어오거나 나갈 때",
    "2. 무엇을: 특정 요소의 상태를",
    "3. 어떻게: 화면에 보이는 비율에 따라 단계적으로 변화시키며",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "관찰할 요소", required: true },
      { name: "threshold", type: "number", description: "가시성 임계값 (0~1)", required: false, default: 0.1 },
      { name: "rootMargin", type: "string", description: "루트 마진 (예: '10px')", required: false },
      { name: "triggerOnce", type: "boolean", description: "한 번만 트리거할지 여부", required: false, default: false },
      { name: "onEnter", type: "function", description: "요소가 화면에 진입할 때 실행할 함수", required: false },
      { name: "onExit", type: "function", description: "요소가 화면을 벗어날 때 실행할 함수", required: false },
    ],
    requiredKnowledge: [
      {
        name: "Intersection Observer API",
        role: "요소의 화면 가시성을 효율적으로 감지하는 브라우저 API",
        type: "JavaScript",
      },
      {
        name: "React Lifecycle",
        role: "컴포넌트 마운트/언마운트 시점에 옵저버를 등록/해제",
        type: "React",
      },
      {
        name: "상태 관리",
        role: "요소의 가시성 상태를 추적하고 UI에 반영",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "요소가 사용자의 화면(뷰포트)에 일정 비율 이상 보일 때",
    interactiveTarget: "관찰 대상으로 지정된 특정 요소",
    interactiveProperty: "요소의 투명도, 크기, 위치 등이 화면 가시성에 따라 점진적으로 변화"
  },
  requiredKnowledge: [
    {
      name: "Intersection Observer API",
      role: "요소가 화면(뷰포트)에 있는지 감지하고 가시성 변화 감시",
      type: "js",
    },
    {
      name: "React (State, Effects, Callbacks)",
      role: "화면 표시 상태 관리 및 컴포넌트 생명주기에 맞게 관찰자 생성/해제",
      type: "react",
    },
    {
      name: "React (Custom Hooks)",
      role: "재사용 가능한 뷰포트 감지 로직 구성",
      type: "react",
    },
    {
      name: "Animation Library (Framer Motion - useInView, useScroll)",
      role: "현재 화면 표시 상태와 스크롤 진행률 감지하는 간편한 API 제공",
      type: "library",
    },
    {
      name: "Animation Library (Framer Motion - Variants, Transitions)",
      role: "표시 상태에 따른 여러 애니메이션 단계 정의",
      type: "library",
    },
  ],
};

export const scrollDirection = {
  title: "Scroll Direction",
  basicIdea:
    "사용자가 페이지를 위로 또는 아래로 스크롤하는지 감지하여 UI 요소의 동작을 제어합니다.",
  examples: ["내비게이션 바", "진행 표시기", "방향 전환 애니메이션"],
  expectedPrompt: "스크롤 방향을 감지해서 UI 요소의 동작을 제어해줘. 스크롤 임계값, 방향별 액션을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 페이지를 위 또는 아래로 스크롤할 때",
    "2. 무엇을: 내비게이션 바나 기타 UI 요소를",
    "3. 어떻게: 스크롤 방향에 따라 보이거나 숨기며",
  ],
  advancedLearning: {
    propsList: [
      { name: "threshold", type: "number", description: "스크롤 방향 감지 임계값 (픽셀)", required: false, default: 50 },
      { name: "onScrollUp", type: "function", description: "위로 스크롤할 때 실행할 함수", required: false },
      { name: "onScrollDown", type: "function", description: "아래로 스크롤할 때 실행할 함수", required: false },
      { name: "children", type: "function", description: "스크롤 방향과 위치를 받는 렌더 함수", required: false },
    ],
    requiredKnowledge: [
      {
        name: "Custom Hook 패턴",
        role: "스크롤 방향 감지 로직을 재사용 가능하게 분리",
        type: "React",
      },
      {
        name: "Scroll 이벤트",
        role: "스크롤 위치 변화를 실시간으로 감지하고 처리",
        type: "JavaScript",
      },
      {
        name: "성능 최적화",
        role: "빈번한 스크롤 이벤트를 효율적으로 처리하는 기법",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 페이지를 세로로 스크롤할 때, 일정 임계값 이상 움직이면",
    interactiveTarget: "내비게이션 바, 플로팅 버튼 등 UI 요소",
    interactiveProperty: "스크롤 방향(위/아래)에 따라 요소가 나타나거나 사라지는 동작"
  },
  requiredKnowledge: [
    {
      name: "React (useEffect Hook)",
      role: "컴포넌트 마운트 시 스크롤 이벤트 리스너 등록 및 언마운트 시 제거",
      type: "react",
    },
    {
      name: "React (useState Hook)",
      role: "현재 스크롤 방향, 이전 스크롤 위치 등의 상태 관리",
      type: "react",
    },
    {
      name: "JavaScript (Window Scroll Event)",
      role: "페이지 스크롤 시 발생하는 이벤트 감지",
      type: "js",
    },
    {
      name: "JavaScript (scrollY Property)",
      role: "현재 페이지의 세로 스크롤 위치 값 가져오기",
      type: "js",
    },
    {
      name: "Performance Optimization (Throttling/Debouncing)",
      role: "빈번한 스크롤 이벤트 처리를 최적화하여 불필요한 연산 줄이기",
      type: "js",
    },
  ],
};

export const fullPageScroll = {
  title: "Full Page Scroll",
  basicIdea:
    "웹사이트를 섹션별로 나누어 전체 화면 단위로 부드럽게 스크롤하는 원페이지 웹사이트를 구현합니다.",
  examples: ["포트폴리오 사이트", "제품 소개", "브랜드 스토리텔링"],
  expectedPrompt: "섹션별로 전체 화면 단위로 스크롤되는 원페이지 웹사이트를 만들어줘. 스크롤 방향, 애니메이션 시간, 키보드 네비게이션, 터치 감도, 네비게이션 도트 색상, 초기 섹션 인덱스를 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 마우스 휠, 키보드, 터치로 스크롤할 때",
    "2. 무엇을: 각 섹션 화면을",
    "3. 어떻게: 한 번에 하나씩 전체 화면 크기로 부드럽게 전환하며",
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "node", description: "각 섹션에 해당하는 컨텐츠 요소들", required: true },
      { name: "direction", type: "select", description: "스크롤 방향", required: false, default: "vertical", options: ["vertical", "horizontal"] },
      { name: "animationDuration", type: "number", description: "섹션 전환 애니메이션 지속 시간(초)", required: false, default: 0.8 },
      { name: "enableMouseWheel", type: "boolean", description: "마우스 휠 스크롤 활성화", required: false, default: true },
      { name: "enableKeyboard", type: "boolean", description: "키보드 네비게이션 활성화", required: false, default: true },
      { name: "enableTouch", type: "boolean", description: "터치/스와이프 네비게이션 활성화", required: false, default: true },
      { name: "touchSensitivity", type: "number", description: "터치 감도 (픽셀)", required: false, default: 50 },
      { name: "showDots", type: "boolean", description: "네비게이션 도트 표시 여부", required: false, default: true },
      { name: "dotsPosition", type: "select", description: "도트 위치", required: false, default: "right", options: ["right", "left", "bottom", "top"] },
      { name: "dotsColor", type: "string", description: "네비게이션 도트 색상", required: false, default: "theme.palette.primary.main" },
      { name: "currentSectionIndex", type: "number", description: "초기 섹션 인덱스", required: false, default: 0 },
      { name: "loop", type: "boolean", description: "마지막 섹션에서 첫 번째 섹션으로 루프", required: false, default: false },
      { name: "onSectionChange", type: "function", description: "섹션 변경 시 호출되는 콜백 함수", required: false },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion",
        role: "부드러운 섹션 전환 애니메이션을 제공하는 라이브러리",
        type: "JavaScript",
      },
      {
        name: "이벤트 핸들링",
        role: "마우스, 키보드, 터치 입력을 감지하고 적절히 처리",
        type: "JavaScript",
      },
      {
        name: "Transform 속성",
        role: "섹션들의 위치를 실시간으로 변경하는 CSS 변환",
        type: "CSS",
      },
      {
        name: "상태 관리",
        role: "현재 활성화된 섹션과 애니메이션 상태를 추적",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 마우스 휠, 키보드 방향키, 터치 스와이프로 스크롤할 때",
    interactiveTarget: "전체 웹페이지의 각 섹션",
    interactiveProperty: "한 번에 하나의 섹션만 화면에 표시되며, 섹션 간 전환이 부드러운 애니메이션으로 처리됨"
  },
}; 