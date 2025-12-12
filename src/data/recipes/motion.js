export const fadeInContainer = {
  title: "Fade In Container",
  basicIdea:
    "요소가 화면에 보일 때 페이드 인과 이동 애니메이션 효과를 자연스럽게 적용합니다.",
  examples: ["콘텐츠 진입", "제품 설명", "섹션 전환"],
  expectedPrompt:
    "화면에 나타날 컨테이너를 만들어줘. 스크롤하여 화면에 보이면 투명도가 0에서 1로 변하며 원하는 방향에서 슬라이드되어 나타나게 해줘. 나타나는 방향과 이동 거리, 애니메이션 속도와 시작 타이밍을 조절할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 스크롤하여 요소가 화면에 보이기 시작할 때",
    "2. 무엇을: 컨테이너 요소를",
    "3. 어떻게: 투명한 상태에서 점점 선명해지며 지정된 방향에서 원래 자리로 부드럽게 이동",
    "4. 최적화: useMemo를 활용하여 애니메이션 상태 객체의 불필요한 재생성 방지",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "children",
        type: "string",
        description: "애니메이션을 적용할 자식 요소들",
        required: false,
      },
      {
        name: "direction",
        type: "enum",
        description: "애니메이션 시작 방향",
        required: true,
        default: "bottom",
        options: ["left", "right", "top", "bottom", "none"],
      },
      {
        name: "offset",
        type: "number",
        description: "시작 방향으로부터의 초기 오프셋 거리(px)",
        required: true,
        default: 50,
      },
      {
        name: "duration",
        type: "number",
        description: "애니메이션 지속 시간(초)",
        required: true,
        default: 0.5,
      },
      {
        name: "delay",
        type: "number",
        description: "애니메이션 시작 전 지연 시간(초)",
        required: true,
        default: 0,
      },
      {
        name: "once",
        type: "boolean",
        description: "애니메이션을 한 번만 실행할지 여부",
        required: true,
        default: true,
      },
      {
        name: "amount",
        type: "number",
        description: "애니메이션 트리거를 위한 요소 노출 비율 (0 ~ 1)",
        required: false,
        default: 0.3,
      },
      {
        name: "style",
        type: "string",
        description: "스타일 객체",
        required: false,
      },
      {
        name: "className",
        type: "string",
        description: "CSS 클래스명",
        required: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion (motion component)",
        role: "애니메이션을 적용할 HTML 요소를 감싸는 특수 컴포넌트",
        type: "library",
      },
      {
        name: "Framer Motion (useInView)",
        role: "요소가 화면에 보이는 시점을 감지하는 훅",
        type: "library",
      },
      {
        name: "Framer Motion (useAnimation)",
        role: "애니메이션의 시작/종료 상태와 전환 방식을 제어하는 훅",
        type: "library",
      },
      {
        name: "React useMemo",
        role: "애니메이션 상태 객체를 메모이제이션하여 useEffect 의존성 최적화",
        type: "react",
      },
      {
        name: "CSS (Transform, Opacity)",
        role: "요소의 위치 이동과 투명도 변화를 위한 기본 스타일 속성",
        type: "css",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "요소가 화면(뷰포트)에 들어올 때",
    interactiveTarget: "HTML 컨테이너 요소",
    interactiveProperty:
      "투명도(opacity)와 위치(x/y축)가 동시에 변화하며 나타나는 효과",
  },
};

export const scrollAwareContainer = {
  title: "Scroll Aware Container",
  basicIdea:
    "스크롤 방향에 따라 컨텐츠를 자동으로 숨기거나 표시하는 스마트한 컨테이너를 구현합니다.",
  examples: ["네비게이션 바", "플로팅 버튼", "고정 헤더"],
  expectedPrompt:
    "스크롤 방향을 감지하는 컨테이너를 만들어줘. 아래로 스크롤하면 숨어지고 위로 스크롤하면 다시 나타나는 애니메이션을 적용해줘. 숨김 효과가 시작될 스크롤 기준점과 컨테이너 스타일을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 페이지를 스크롤할 때",
    "2. 무엇을: 고정된 컨테이너를",
    "3. 어떻게: 스크롤 방향에 따라 위아래로 슬라이드하며 숨김/표시",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "children",
        type: "string",
        description: "내부에 표시될 컨텐츠",
        required: false,
      },
      {
        name: "threshold",
        type: "number",
        description: "헤더를 항상 표시할 스크롤 임계값 (px)",
        required: true,
        default: 100,
      },
      {
        name: "sx",
        type: "string",
        description: "가장 바깥쪽 Wrapper Box에 적용할 추가 스타일",
        required: false,
        default: {},
      },
    ],
    requiredKnowledge: [
      {
        name: "Custom Hook (useScrollDirection)",
        role: "스크롤 방향을 감지하는 커스텀 훅",
        type: "react",
      },
      {
        name: "Framer Motion (motion component)",
        role: "애니메이션을 적용할 컨테이너 컴포넌트",
        type: "library",
      },
      {
        name: "CSS (position: sticky)",
        role: "컨테이너를 화면에 고정시키는 스타일",
        type: "css",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "페이지 스크롤 방향이 변경될 때",
    interactiveTarget: "고정된 컨테이너 요소",
    interactiveProperty: "Y축 위치가 변경되며 숨김/표시되는 효과",
  },
};

export const fadeInGrid = {
  title: "Fade In Grid",
  basicIdea:
    "Grid 아이템들이 순차적으로 나타나는 시차 애니메이션 효과를 적용합니다.",
  examples: ["제품 갤러리", "포트폴리오", "이미지 그리드"],
  expectedPrompt:
    "그리드 아이템들이 순차적으로 페이드인되는 애니메이션을 만들어줘. 각 아이템마다 시간차를 두고 나타나게 해줘. 나타나는 방향과 이동 거리, 개별 애니메이션 속도와 아이템 간 간격 시간을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 그리드가 화면에 보이기 시작할 때",
    "2. 무엇을: 각 그리드 아이템을",
    "3. 어떻게: 투명한 상태에서 점점 선명해지며 순차적으로 나타남",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "components",
        type: "string[]",
        description: "그리드에 표시할 컴포넌트 배열",
        required: false,
      },
      {
        name: "itemSize",
        type: "string",
        description:
          "각 Grid 아이템의 반응형 사이즈 설정 (ex: { xs: 12, sm: 6, md: 4 })",
        required: false,
      },
      {
        name: "container",
        type: "boolean",
        description: "Grid 컨테이너 여부",
        required: false,
      },
      {
        name: "spacing",
        type: "number",
        description: "아이템 간 간격",
        required: true,
      },
      {
        name: "direction",
        type: "enum",
        description: "애니메이션 시작 방향",
        required: true,
        default: "bottom",
        options: ["top", "bottom", "left", "right", "none"],
      },
      {
        name: "offset",
        type: "number",
        description: "시작 오프셋 거리(px)",
        required: true,
        default: 50,
      },
      {
        name: "duration",
        type: "number",
        description: "개별 아이템 애니메이션 시간(초)",
        required: true,
        default: 0.5,
      },
      {
        name: "delay",
        type: "number",
        description: "아이템별 애니메이션 시작 지연 시간(초)",
        required: false,
        default: 0.1,
      },
      {
        name: "once",
        type: "boolean",
        description: "애니메이션 한 번만 실행 여부",
        required: true,
        default: true,
      },
      {
        name: "amount",
        type: "number",
        description: "트리거 요소 노출 비율",
        required: false,
        default: 0.3,
      },
      {
        name: "sx",
        type: "string",
        description: "Grid 컨테이너에 적용할 추가 스타일",
        required: false,
      },
      {
        name: "itemSx",
        type: "string",
        description: "각 Grid 아이템(FadeInContainer)에 적용할 추가 스타일",
        required: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "MUI Grid",
        role: "반응형 그리드 레이아웃 구현",
        type: "mui",
      },
      {
        name: "FadeInContainer",
        role: "페이드인 애니메이션 효과를 제공하는 컨테이너 컴포넌트",
        type: "component",
      },
      {
        name: "React Children",
        role: "자식 컴포넌트 배열을 순회하며 애니메이션 적용",
        type: "react",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "그리드가 화면에 보이기 시작할 때",
    interactiveTarget: "Grid 아이템들",
    interactiveProperty: "투명도와 위치가 순차적으로 변화하며 나타나는 효과",
  },
};

export const cardContainer = {
  title: "Card Container",
  basicIdea:
    "카드 UI에 다양한 호버 효과와 애니메이션을 적용하여 인터랙티브한 사용자 경험을 제공합니다.",
  examples: ["제품 카드", "블로그 게시물", "프로젝트 소개"],
  expectedPrompt:
    "인터랙티브한 카드 컨테이너를 만들어줘. 이미지와 콘텐츠 영역을 포함하고, 마우스 오버 시 확대, 그림자, 테두리 발광 등 다양한 시각적 피드백을 선택할 수 있게 해줘. 링크 연결과 색상 테마 커스터마이징도 가능하게 해줘.",
  detailedProcess: [
    "1. 언제: 마우스가 카드 위에 올라오거나 클릭할 때",
    "2. 무엇을: 카드 전체를",
    "3. 어떻게: 크기, 그림자, 테두리 등이 부드럽게 변화하며 인터랙션 피드백 제공",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "imageSrc",
        type: "string",
        description: "이미지 URL (없으면 placeholder 사용)",
        required: false,
      },
      {
        name: "aspectRatio",
        type: "number",
        description: "이미지 영역 비율",
        required: false,
        default: 4 / 3,
      },
      {
        name: "hoverEffect",
        type: "enum",
        description: "호버 효과 타입",
        required: true,
        default: "scale",
        options: [
          "scale",
          "shadow",
          "border",
          "glow",
          "lift",
          "rotate",
          "none",
        ],
      },
      {
        name: "linkTo",
        type: "string",
        description: "링크 경로 (제공되면 카드가 링크로 작동)",
        required: false,
      },
      {
        name: "children",
        type: "string",
        description: "카드 내부에 표시될 컨텐츠",
        required: false,
      },
      {
        name: "sx",
        type: "string",
        description: "카드의 스타일 오버라이드",
        required: false,
        default: {},
      },
      {
        name: "animate",
        type: "boolean",
        description: "애니메이션 활성화 여부",
        required: false,
        default: true,
      },
      {
        name: "borderColor",
        type: "color",
        description: "카드 테두리 색상",
        required: true,
        default: "rgba(128,128,128,0.2)",
      },
      {
        name: "boxShadow",
        type: "color",
        description: "카드 그림자 색상",
        required: true,
        default: "rgba(0,0,0,0.05)",
      },
      {
        name: "glowColor",
        type: "color",
        description: "카드에 적용할 발광 색상",
        required: true,
        default: "rgba(0,0,0,0.05)",
      },
    ],
    requiredKnowledge: [
      {
        name: "MUI Box",
        role: "카드 UI의 기본 구조와 스타일링",
        type: "mui",
      },
      {
        name: "Framer Motion",
        role: "애니메이션 상태 관리와 전환 효과 구현",
        type: "library",
      },
      {
        name: "React Router Link",
        role: "페이지 이동 기능 구현",
        type: "library",
      },
      {
        name: "ImagePlaceholder",
        role: "이미지가 없을 때 사용할 플레이스홀더 컴포넌트",
        type: "component",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition:
      "마우스가 카드 위에 올라왔을 때(hover)와 클릭했을 때(tap)",
    interactiveTarget: "카드 컴포넌트",
    interactiveProperty:
      "크기, 그림자, 테두리 등의 시각적 속성이 변화하는 효과",
  },
};

export const gradientButton = {
  title: "Gradient Button",
  basicIdea:
    "CTA를 유도하기 위해 애니메이션이 적용된 선형 그라디언트 배경의 버튼을 구현합니다.",
  examples: ["구매 버튼", "뉴스레터 구독", "회원가입"],
  expectedPrompt:
    "그라데이션 배경이 반복적으로 순환하며 흐르는 버튼을 만들어줘. 그라데이션이 흘러가는 방향과 반복할 색상들을 설정할 수 있고, 마우스 오버 시 흐름 속도가 느려지게 해줘. 버튼 크기와 전체 너비 확장, 비활성화 상태도 제어할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 버튼이 화면에 나타날 때부터 지속적으로, 호버 시 변화",
    "2. 무엇을: 버튼의 그라데이션 배경을",
    "3. 어떻게: 설정된 각도 방향으로 반복적으로 순환하며 흘러가고, 호버 시 속도 감소",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "children",
        type: "string",
        description: "버튼 내용",
        required: false,
      },
      {
        name: "angle",
        type: "number",
        description: "그라데이션 각도(방향) (degrees)",
        required: true,
        default: 90,
      },
      {
        name: "colors",
        type: "color[]",
        description: "그라데이션 색상 배열",
        required: true,
        default: ["#0ea5e9", "#22d3ee", "#0ea5e9"],
      },
      {
        name: "size",
        type: "enum",
        description: "버튼 크기",
        required: false,
        default: "large",
        options: ["small", "medium", "large"],
      },
      {
        name: "sx",
        type: "string",
        description: "추가 스타일 객체",
        required: false,
        default: {},
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "버튼 너비를 부모 요소 전체 너비로 확장",
        required: false,
        default: false,
      },
      {
        name: "animationDuration",
        type: "string",
        description: "애니메이션 지속 시간 (CSS 시간 단위)",
        required: false,
        default: "6s",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "버튼 비활성화 여부",
        required: false,
        default: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "MUI Button",
        role: "버튼의 기본 구조와 스타일링",
        type: "mui",
      },
      {
        name: "Web Animations API",
        role: "배경 위치 변경 애니메이션 구현",
        type: "js",
      },
      {
        name: "CSS Linear Gradients",
        role: "선형 그라데이션 배경 생성과 각도 계산",
        type: "css",
      },
      {
        name: "MUI Box",
        role: "그라데이션 배경을 담을 컨테이너",
        type: "mui",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 버튼 위에 올라왔을 때(hover)",
    interactiveTarget: "버튼 배경과 크기",
    interactiveProperty:
      "그라데이션 배경의 흐름 속도와 버튼 크기가 변화하는 효과",
  },
};

export const stickyContainer = {
  title: "Sticky Container",
  basicIdea: "스크롤 시 화면 상단 또는 하단에 고정되는 컨테이너를 구현합니다.",
  examples: ["고정 헤더", "플로팅 버튼", "네비게이션"],
  expectedPrompt:
    "스크롤 시 화면에 고정되는 컨테이너를 만들어줘. 상단이나 하단 중 원하는 고정 위치를 선택할 수 있고, 화면 가장자리에서 떨어진 여백 거리를 조절할 수 있게 해줘. 고정 상태일 때 그림자 등 시각적 변화도 적용할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 스크롤하여 지정된 위치에 도달할 때",
    "2. 무엇을: 컨테이너를",
    "3. 어떻게: 화면의 특정 위치에 고정시키며, 필요 시 시각적 변화 적용",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "children",
        type: "string",
        description: "스티키 컨테이너 내부에 표시될 컨텐츠",
        required: true,
      },
      {
        name: "position",
        type: "enum",
        description: "sticky 위치 ('top', 'bottom')",
        required: false,
        default: "top",
        options: ["top", "bottom"],
      },
      {
        name: "offset",
        type: "number",
        description: "sticky 위치 오프셋(px)",
        required: false,
        default: 0,
      },
      {
        name: "activeStyle",
        type: "string",
        description: "sticky 활성화 시 적용할 스타일",
        required: false,
        default: { boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
      },
      {
        name: "sx",
        type: "string",
        description: "기본 스타일",
        required: false,
      },
      {
        name: "detectSticky",
        type: "boolean",
        description: "sticky 상태 감지 여부",
        required: false,
        default: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "CSS Position Sticky",
        role: "요소를 스크롤에 따라 화면에 고정시키는 속성",
        type: "css",
      },
      {
        name: "Intersection Observer",
        role: "요소의 sticky 상태를 감지하는 API",
        type: "js",
      },
      {
        name: "MUI Box",
        role: "스티키 컨테이너의 기본 구조와 스타일링",
        type: "mui",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "스크롤하여 지정된 위치에 도달할 때",
    interactiveTarget: "컨테이너 요소",
    interactiveProperty: "화면의 특정 위치에 고정되며 선택적 스타일 변화",
  },
};

export const dynamicSortGrid = {
  title: "Dynamic Sort Grid",
  basicIdea:
    "그리드 내 아이템들을 다양한 기준에 따라 애니메이션과 함께 동적으로 정렬합니다. 컴포넌트가 미리 바인딩된 객체 배열을 받아 처리합니다.",
  examples: ["제품 카탈로그", "포트폴리오", "블로그 목록"],
  expectedPrompt:
    "정렬 가능한 그리드를 만들어줘. 컴포넌트가 미리 바인딩된 데이터를 받아서 원하는 기준으로 오름차순이나 내림차순 정렬할 때마다 아이템들이 애니메이션과 함께 재배치되게 해줘. 정렬 전환 애니메이션 속도와 아이템별 등장 타이밍, 사라질 때와 나타날 때 모션을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 정렬 기준이나 필터 조건이 변경될 때",
    "2. 무엇을: 미리 바인딩된 컴포넌트 객체들을",
    "3. 어떻게: 새로운 순서로 부드럽게 이동하며 재배치",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "componentItems",
        type: "object[]",
        description:
          "컴포넌트와 정렬 데이터를 포함한 객체 배열. 각 객체는 component 필드와 정렬에 사용할 데이터 필드들을 포함해야 함",
        required: true,
      },
      {
        name: "keyField",
        type: "string",
        description: "각 아이템의 고유 키로 사용할 필드명",
        required: true,
      },
      {
        name: "sortField",
        type: "string",
        description: "정렬 기준 필드 (componentItems 객체의 필드명)",
        required: false,
        default: null,
      },
      {
        name: "sortDirection",
        type: "enum",
        description: "정렬 방향 ('asc' | 'desc')",
        required: false,
        default: "asc",
        options: ["asc", "desc"],
      },
      {
        name: "filterFn",
        type: "function",
        description: "아이템 필터링 함수 (componentItem) => boolean",
        required: false,
      },
      {
        name: "gridProps",
        type: "object",
        description: "MUI Grid container에 전달할 props",
        required: false,
      },
      {
        name: "animationDuration",
        type: "number",
        description: "애니메이션 지속 시간(ms)",
        required: false,
        default: 500,
      },
      {
        name: "maxRandomDelay",
        type: "number",
        description: "최대 랜덤 딜레이(ms)",
        required: false,
        default: 200,
      },
      {
        name: "exitStyle",
        type: "object",
        description: "아이템 퇴장 스타일",
        required: false,
        default: { opacity: 0, scale: 0.8, y: 50 },
      },
      {
        name: "enterStyle",
        type: "object",
        description: "아이템 진입 스타일",
        required: false,
        default: { opacity: 0, scale: 0.8, y: 50 },
      },
      {
        name: "columns",
        type: "number",
        description: "그리드 열 수",
        required: false,
        default: 12,
      },
      {
        name: "sx",
        type: "object",
        description: "추가 스타일",
        required: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion Layout",
        role: "요소의 위치 변경 시 자동 애니메이션 적용",
        type: "library",
      },
      {
        name: "Framer Motion AnimatePresence",
        role: "요소 추가/제거 시 전환 효과 제공",
        type: "library",
      },
      {
        name: "MUI Grid System",
        role: "반응형 그리드 레이아웃 구현",
        type: "mui",
      },
      {
        name: "Array Sort/Filter Methods",
        role: "컴포넌트 객체 배열의 정렬 및 필터링 로직",
        type: "js",
      },
      {
        name: "React Component Binding",
        role: "데이터와 컴포넌트를 미리 바인딩하여 객체 배열 생성",
        type: "react",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "정렬 기준이 변경될 때",
    interactiveTarget: "미리 바인딩된 컴포넌트 객체들의 배치",
    interactiveProperty:
      "컴포넌트들이 새로운 정렬 순서에 따라 부드럽게 재배치됨",
  },
};

export const alternatingSlideGrid = {
  title: "Alternating Slide Grid",
  basicIdea:
    "그리드 아이템들이 좌우 번갈아가며 슬라이드되어 나타나는 시차 애니메이션을 구현합니다.",
  examples: ["특징 소개", "팀원 소개", "타임라인"],
  expectedPrompt:
    "좌우 번갈아가며 슬라이드되는 그리드를 만들어줘. 짝수 행은 왼쪽에서, 홀수 행은 오른쪽에서 나타나게 해줘. 슬라이드 애니메이션 속도와 각 아이템 간 등장 간격, 마스킹할 배경색을 설정할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 스크롤하여 각 행이 화면에 보이기 시작할 때",
    "2. 무엇을: 그리드 내 각 행의 아이템을",
    "3. 어떻게: 짝수/홀수 행에 따라 좌우 다른 방향에서 슬라이드되며 나타남",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "children",
        type: "string",
        description: "그리드에 표시할 아이템 요소들",
        required: true,
      },
      {
        name: "animationDuration",
        type: "number",
        description: "애니메이션 지속 시간(초)",
        required: false,
        default: 0.8,
      },
      {
        name: "animationDelay",
        type: "number",
        description: "각 아이템 애니메이션 사이 지연 시간(초)",
        required: false,
        default: 0.15,
      },
      {
        name: "maskColor",
        type: "color",
        description: "마스킹 효과에 사용할 배경색",
        required: false,
        default: "#ffffff",
      },
      {
        name: "animateOnScroll",
        type: "boolean",
        description: "스크롤 시 애니메이션 시작 여부",
        required: false,
        default: true,
      },
      {
        name: "scrollThreshold",
        type: "number",
        description: "스크롤 애니메이션 시작 임계값(0-1)",
        required: false,
        default: 0.2,
      },
      {
        name: "sx",
        type: "string",
        description: "추가 스타일 객체",
        required: false,
      },
    ],
    requiredKnowledge: [
      {
        name: "Framer Motion useInView",
        role: "요소가 뷰포트에 보이는지 감지",
        type: "library",
      },
      {
        name: "Framer Motion useAnimation",
        role: "애니메이션 상태 제어",
        type: "library",
      },
      {
        name: "React useRef",
        role: "DOM 요소 참조 및 애니메이션 상태 관리",
        type: "react",
      },
      {
        name: "MUI Grid System",
        role: "반응형 그리드 레이아웃 구현",
        type: "mui",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "스크롤하여 아이템이 화면에 보이기 시작할 때",
    interactiveTarget: "그리드 내 각 행의 아이템",
    interactiveProperty: "짝수/홀수 행에 따라 좌우에서 슬라이드되어 나타남",
  },
};
