/**
 * 타이포그래피 관련 레시피 모음
 */

const variantList = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "button", "caption", "overline"];
// 스크램블 텍스트 레시피
export const scrambleText = {
  title: "Scramble Text",
  basicIdea:
    "특수 문자들이 무작위로 섞이면서 내가 원하는 텍스트가 등장하는 효과.",
  examples: ["로딩 화면", "콘텐츠 전환", "강조 효과"],
  expectedPrompt: "ScrambleText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 등장할 때 무작위 특수문자에서 원래 텍스트로 변환되는 효과를 구현해야 합니다. text prop으로 최종 텍스트를, scrambleChars prop으로 변환에 사용할 특수문자를, scrambleSpeed prop으로 변환 속도를, iterationStep prop으로 복원 단계를, startDelay prop으로 시작 전 대기 시간을, variant prop으로 텍스트 스타일을 설정할 수 있도록 해주세요.",
  detailedProcess: [
    "1. 언제: 화면에 컴포넌트가 나타나고 대기 시간이 지났을 때",
    "2. 무엇을: 텍스트의 각 글자들을",
    "3. 어떻게: 특수문자에서 원래 글자로 단계적으로 복원하며 시각적 강조 효과를 만듭니다",
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "최종적으로 표시할 텍스트", required: true, default: "Hello World!" },
      { name: "scrambleChars", type: "string", description: "스크램블에 사용할 특수문자 집합", required: true, default: "!<>-_\\/[]{}—=+*^?#_~" },
      { name: "scrambleSpeed", type: "number", description: "각 프레임당 스크램블 속도(ms)", required: true, default: 30 },
      { name: "iterationStep", type: "number", description: "스크램블 복원 단계 증가량", required: true, default: 1 },
      { name: "color", type: "string", description: "텍스트 색상", required: true, default: "inherit" },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "startDelay", type: "number", description: "애니메이션 시작 전 대기 시간(ms)", required: false, default: 500 },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false, default: "{}" },
    ],
    requiredKnowledge: [
      {
        name: "setInterval",
        role: "정해진 시간 간격으로 글자 변환 프로세스를 반복 실행",
        type: "JavaScript",
      },
      {
        name: "useState",
        role: "현재 화면에 표시되는 텍스트 상태 관리",
        type: "React",
      },
      {
        name: "useRef",
        role: "인터벌 참조와 이펙트 중복 실행 방지를 위한 상태 추적",
        type: "React",
      },
      {
        name: "String.split/join",
        role: "텍스트를 개별 글자로 분리하고 변환 후 다시 결합",
        type: "JavaScript",
      },
      {
        name: "Math.random",
        role: "무작위 특수문자 선택을 위한 랜덤 인덱스 생성",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컴포넌트 마운트 후 startDelay 시간이 지났을 때",
    interactiveTarget: "텍스트의 각 개별 글자",
    interactiveProperty: "글자 내용이 무작위 특수문자에서 원래 글자로 순차적으로 복원되는 변화"
  }
};

// 타이핑 효과 레시피
export const typingEffect = {
  title: "Typing Effect",
  basicIdea: "1개 이상의 문장들이 한 글자씩 타이핑되면서 전환되는 효과.",
  examples: ["챗봇 응답", "콘텐츠 소개", "타이틀 강조"],
  expectedPrompt: "TypingEffect 컴포넌트를 만들어주세요. 이 컴포넌트는 화면에 보일 때 문장을 타이핑하는 효과를 보여줍니다. texts prop으로 타이핑할 문장들을 배열로 받고, typingSpeed prop으로 타이핑 속도를, deleteSpeed prop으로 지우는 속도를 설정할 수 있게 해주세요. cursorType prop으로 커서 모양을, cursorColor prop으로 커서 색상을 지정할 수 있게 해주세요. variant prop으로 텍스트 스타일을, startDelay prop으로 시작 전 대기 시간을 조절할 수 있게 해주세요.",
  detailedProcess: [
    "1. 언제: 화면에 보이고 대기 시간이 지났을 때",
    "2. 무엇을: 여러 문장을",
    "3. 어떻게: 한 글자씩 타이핑하고 지우는 반복 애니메이션으로 표현"
  ],
  advancedLearning: {
    propsList: [
      { name: "texts", type: "string[]", description: "순차적으로 타이핑할 문장들의 배열", required: true, default: "['Hello Designers', 'You can make it', 'With Cursor AI.']" },
      { name: "typingSpeed", type: "number", description: "각 글자 타이핑 속도(ms)", required: true, default: 100 },
      { name: "deleteSpeed", type: "number", description: "각 글자 삭제 속도(ms)", required: true, default: 50 },
      { name: "cursorColor", type: "string", description: "커서 색상", required: true, default: "#fff" },
      { name: "textColor", type: "string", description: "텍스트 색상", required: true, default: "inherit" },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "textAlign", type: "string", description: "텍스트 정렬", required: false, default: "left" },
      { name: "fontFamily", type: "string", description: "폰트 패밀리", required: false },
      { name: "fontWeight", type: "string", description: "폰트 굵기", required: false, default: "bold" },
      { name: "fontSize", type: "object", description: "폰트 사이즈 객체", required: false },
      { name: "startDelay", type: "number", description: "애니메이션 시작 전 대기 시간(ms)", required: true, default: 0 },
      { name: "cursorType", type: "enum", description: "커서 타입", required: true, default: "line", options: ["line", "circle", "square"] },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false, default: "{}" },
    ],
    requiredKnowledge: [
      {
        name: "useIsInView",
        role: "뷰포트 진입 감지로 애니메이션 시작 시점을 제어",
        type: "Custom Hook",
      },
      {
        name: "useState (multiple)",
        role: "현재 텍스트, 문장 인덱스, 글자 인덱스, 타이핑/삭제 상태, 시작 여부 등 복합 상태 관리",
        type: "React",
      },
      {
        name: "useEffect (multiple)",
        role: "뷰포트 진입과 타이핑 로직을 별도로 관리하는 다중 이펙트 구현",
        type: "React",
      },
      {
        name: "setTimeout",
        role: "타이핑/삭제/대기 단계별 타이밍 제어",
        type: "JavaScript",
      },
      {
        name: "String.charAt/slice",
        role: "문장에서 한 글자씩 추가하거나 끝에서부터 제거하는 문자열 조작",
        type: "JavaScript",
      },
      {
        name: "CSS @keyframes",
        role: "커서 깜빡임 애니메이션 구현",
        type: "CSS",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컴포넌트가 뷰포트에 진입하고 설정된 시작 지연 시간이 지났을 때",
    interactiveTarget: "텍스트 내용과 커서 요소",
    interactiveProperty: "텍스트가 한 글자씩 나타나고 사라지는 타이핑 효과와 커서의 깜빡임 애니메이션"
  }
};

// 마그네틱 텍스트 레시피
export const magneticText = {
  title: "Magnetic Text",
  basicIdea: "마우스 커서의 거리에 따라 글자가 자석처럼 끌려오는 효과",
  examples: ["버튼 강조", "링크 인터랙션", "네비게이션 메뉴"],
  expectedPrompt: "마우스 움직임에 따라 텍스트가 자석처럼 반응하는 MagneticText 컴포넌트를 만들어주세요. text prop으로 표시할 텍스트를, variant prop으로 크기를, textColor prop으로 색상을 설정할 수 있도록 구현해주세요. GSAP quickSetter를 사용해 성능을 최적화하고, elastic 이징으로 자연스러운 움직임을 구현해주세요.",
  detailedProcess: [
    "1. 언제: 마우스가 텍스트 영역에 진입하거나 움직일 때",
    "2. 무엇을: 텍스트의 각 글자를",
    "3. 어떻게: 마우스와의 거리에 따라 자석처럼 끌려오는 효과를 만듭니다"
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "자석 효과를 적용할 텍스트", required: true, default: "Magnetic Effect Sample" },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "textColor", type: "string", description: "텍스트 색상", required: true, default: "inherit" },
    ],
    requiredKnowledge: [
      {
        name: "GSAP quickSetter",
        role: "개별 글자의 x, y 좌표를 성능 최적화된 방식으로 실시간 업데이트",
        type: "GSAP",
      },
      {
        name: "getBoundingClientRect",
        role: "각 글자의 화면상 정확한 위치와 크기 정보를 계산",
        type: "DOM API",
      },
      {
        name: "Math.sqrt",
        role: "마우스 커서와 글자 중심점 간의 유클리드 거리 계산",
        type: "JavaScript",
      },
      {
        name: "onMouseMove/onMouseLeave",
        role: "마우스 이벤트를 통한 커서 위치 추적과 영역 이탈 감지",
        type: "React Events",
      },
      {
        name: "useRef (multiple)",
        role: "컨테이너, 텍스트, 개별 글자들의 DOM 참조와 GSAP 인스턴스 관리",
        type: "React",
      },
      {
        name: "String.split",
        role: "텍스트를 개별 글자 단위로 분리하여 각각 독립적으로 애니메이션 적용",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 텍스트 컨테이너 위에서 움직이거나 텍스트 영역을 벗어날 때",
    interactiveTarget: "텍스트의 각 개별 글자",
    interactiveProperty: "글자의 x, y 좌표가 마우스 위치와의 거리에 비례하여 탄성 애니메이션으로 변화"
  }
};

// 3D 회전 텍스트 레시피
export const rotatingText3D = {
  title: "Rotating Text 3D",
  basicIdea:
    "3D 공간에서 떠다니는 텍스트들이 마우스 호버시 정렬되는 효과.",
  examples: ["브랜드 소개", "특별 이벤트", "웹사이트 헤더"],
  expectedPrompt: "3D 공간에서 떠다니는 텍스트를 구현하는 RotatingText3D 컴포넌트를 만들어주세요. text prop으로 표시할 내용을, size prop으로 글자 크기를, textColor prop으로 색상을 설정할 수 있도록 해주세요. 마우스 호버 시 글자들이 정렬되며, 베벨과 조명으로 입체감을 표현해주세요.",
  detailedProcess: [
    "1. 언제: 마우스가 텍스트 영역에 접근하거나 이탈할 때",
    "2. 무엇을: 3D 공간에 배치된 글자들을",
    "3. 어떻게: 랜덤한 위치에서 정렬된 형태로, 또는 그 반대로 자연스럽게 이동하며 회전합니다",
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "3D로 표시할 텍스트", required: true, default: "Hello Designers" },
      { name: "size", type: "number", description: "글자 크기", required: true, default: 0.75 },
      { name: "textColor", type: "string", description: "글자 색상", required: true, default: "#ffffff" },
    ],
    requiredKnowledge: [
      {
        name: "React Three Fiber",
        role: "React에서 Three.js를 선언적으로 사용하기 위한 라이브러리",
        type: "Library",
      },
      {
        name: "@react-three/drei",
        role: "Text3D 컴포넌트를 통한 3D 텍스트 지오메트리 생성",
        type: "Library",
      },
      {
        name: "useFrame",
        role: "매 프레임마다 애니메이션 업데이트를 수행하는 React Three Fiber 훅",
        type: "React/Three.js",
      },
      {
        name: "useMemo",
        role: "랜덤 위치, 회전값, 원래 위치 등 계산 비용이 큰 값들의 메모이제이션",
        type: "React",
      },
      {
        name: "THREE.MathUtils.lerp",
        role: "현재 위치에서 목표 위치로 부드럽게 보간하는 Three.js 유틸리티",
        type: "Three.js",
      },
      {
        name: "useState",
        role: "마우스 호버 상태 관리를 통한 애니메이션 전환 제어",
        type: "React",
      },
      {
        name: "Canvas/Camera/Lighting",
        role: "3D 장면 설정, 카메라 위치와 시야각, 조명 설정",
        type: "Three.js",
      },
      {
        name: "JSON Font Loading",
        role: "Abril Fatface 폰트의 JSON 파일을 불러와 3D 텍스트 생성",
        type: "Three.js",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 3D 텍스트 컨테이너에 진입하거나 벗어날 때",
    interactiveTarget: "3D 공간에 배치된 각 개별 글자 오브젝트",
    interactiveProperty: "글자들의 3D 위치와 회전이 랜덤 상태와 정렬 상태 사이에서 부드럽게 전환"
  }
};

// 스크롤 스태거 텍스트 레시피
export const scrollStaggerText = {
  title: "Scroll Stagger Text",
  basicIdea:
    "스크롤에 따라 텍스트가 순차적으로 나타나는 시차 효과.",
  examples: ["브랜드 스토리", "기능 소개", "타임라인"],
  expectedPrompt: "스크롤에 따라 글자가 하나씩 나타나는 ScrollStaggerText 컴포넌트를 만들어주세요. 텍스트가 화면의 80% 지점에 도달하면, 각 글자가 순차적으로 투명도가 0.1에서 1.0으로 변하면서 나타나도록 구현해주세요. 컴포넌트는 다음 기능들을 포함해야 합니다:\n\n- text: 표시할 텍스트 설정\n- variant: 글자 크기와 스타일 설정\n- textColor: 글자 색상 설정\n- showMarkers: 스크롤 트리거 위치 표시 여부\n- keepVisible: 스크롤 후에도 글자가 계속 보이게 할지 여부\n- scroller: 스크롤을 감지할 영역 설정\n- id: 컴포넌트 구분을 위한 고유 ID",
  detailedProcess: [
    "1. 언제: 스크롤하여 텍스트가 화면의 80% 지점에 도달할 때",
    "2. 무엇을: 텍스트의 각 글자를",
    "3. 어떻게: 스크롤 진행에 따라 순차적으로 투명도가 0.1에서 1.0으로 변화하며 나타나게 함"
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "시차 효과를 적용할 텍스트 (\n으로 줄바꿈)", required: true, default: "Hello Designers,\nYou can make it\nWith Cursor AI." },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "textColor", type: "string", description: "텍스트 색상", required: false, default: "inherit" },
      { name: "showMarkers", type: "boolean", description: "ScrollTrigger 마커 표시 여부", required: false, default: false },
      { name: "keepVisible", type: "boolean", description: "스크롤 후 텍스트 유지 여부", required: true, default: true },
      { name: "scroller", type: "string | Element", description: "스크롤 이벤트를 감지할 컨테이너", required: false, default: window },
      { name: "id", type: "string", description: "컴포넌트 고유 ID (ScrollTrigger 중첩 방지용)", required: false, default: "랜덤 생성" },
    ],
    requiredKnowledge: [
      {
        name: "SplitType",
        role: "텍스트를 글자 및 단어 단위로 분할하여 개별 제어 가능하게 함",
        type: "Library",
      },
      {
        name: "GSAP ScrollTrigger",
        role: "스크롤 위치를 감지하여 특정 지점에서 애니메이션 시작 및 진행도 제어",
        type: "Library",
      },
      {
        name: "GSAP Context",
        role: "애니메이션 인스턴스를 컨테이너별로 관리하여 메모리 누수 방지",
        type: "Library",
      },
      {
        name: "Opacity Animation",
        role: "각 글자의 투명도를 순차적으로 변화시켜 나타나는 효과 구현",
        type: "CSS/GSAP",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 스크롤하여 텍스트 영역이 뷰포트의 80% 지점에 진입할 때",
    interactiveTarget: "SplitType으로 분할된 각 개별 글자",
    interactiveProperty: "스크롤 진행도에 따라 각 글자의 opacity가 0.1에서 1.0으로 순차적 변화하며 스태거 효과 생성"
  }
};

// 그라데이션 타이포그래피 레시피
export const gradientTypography = {
  title: "Gradient Typography",
  basicIdea:
    "텍스트에 그라데이션 색상이 자동으로 흐르거나 마우스 반응으로 변화하는 효과.",
  examples: ["브랜드 로고", "페이지 제목", "강조 문구"],
  expectedPrompt: "MUI Typography를 활용한 그라데이션 텍스트 컴포넌트를 만들어줘. text로 표시할 문자열, gradient로 색상 배열, angle로 그라데이션 방향, variant로 텍스트 크기, animationSpeed로 자동 흐름 속도를 설정할 수 있게 해줘. 마우스 호버 시 색상이 통일되는 효과도 추가해줘.",
  detailedProcess: [
    "1. 언제: 화면에 나타나자마자 자동으로, 또는 마우스가 텍스트 위로 올라갔을 때",
    "2. 무엇을: 텍스트의 색상을",
    "3. 어떻게: 여러 색상이 부드럽게 흘러가거나 마우스 반응으로 단색으로 변화"
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "그라데이션을 적용할 텍스트 내용", required: true },
      { name: "gradient", type: "color[]", description: "그라데이션 색상 배열 (최소 2개)", required: true, default: ["#ff0000", "#0000ff"] },
      { name: "angle", type: "number", description: "그라데이션 각도 (도 단위, 0-360)", required: true, default: 0 },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h3", options: variantList },
      { name: "animationSpeed", type: "number", description: "애니메이션 속도 (초 단위)", required: true, default: 3 },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false },
    ],
    requiredKnowledge: [
      {
        name: "Background Clipping",
        role: "배경 이미지를 텍스트 모양으로 잘라내어 글자에 그라데이션 표현",
        type: "CSS",
      },
      {
        name: "Linear Gradient",
        role: "여러 색상을 지정된 방향으로 자연스럽게 혼합하는 CSS 기능",
        type: "CSS",
      },
      {
        name: "CSS Animations",
        role: "keyframes와 backgroundPosition을 활용한 그라데이션 이동 애니메이션",
        type: "CSS",
      },
      {
        name: "Color Interpolation",
        role: "두 색상 사이의 중간 색상을 계산하여 부드러운 색상 전환 구현",
        type: "JavaScript",
      },
      {
        name: "Mouse Events",
        role: "마우스 진입과 떠남을 감지하여 호버 상태에 따른 스타일 변경",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컴포넌트가 화면에 나타나자마자, 또는 마우스가 텍스트 영역에 진입했을 때",
    interactiveTarget: "텍스트에 적용된 그라데이션 색상",
    interactiveProperty: "색상이 자동으로 흘러가는 애니메이션이나 마우스 호버 시 단일 색상으로 변화하는 효과"
  }
};

// 카운터 타이포그래피 레시피
export const counterTypography = {
  title: "Counter Typography",
  basicIdea:
    "숫자가 카운팅되는 효과",
  examples: ["통계 데이터", "마일스톤", "카운트다운"],
  expectedPrompt: "react-countup 라이브러리와 MUI Typography를 활용하여 숫자 카운팅 애니메이션을 구현하는 CounterTypography 컴포넌트를 만들어주세요. start와 end prop으로 시작값과 목표값을 설정하고, unit과 unitPosition prop으로 단위 텍스트와 위치를 지정할 수 있게 해주세요. duration prop으로 애니메이션 지속 시간을, decimals prop으로 소수점 자릿수를, separator prop으로 천 단위 구분자를 설정할 수 있게 해주세요. useEasing prop으로 이징 효과를 제어하고, enableScrollSpy prop으로 스크롤 기반 자동 시작을 활성화할 수 있게 해주세요. variant prop으로 Typography 스타일을 지정하고, sx prop으로 추가 스타일을 적용할 수 있게 해주세요.",
  detailedProcess: [
    "1. 언제: enableScrollSpy가 활성화된 경우 뷰포트 진입 시, 또는 컴포넌트 마운트 시",
    "2. 무엇을: start 값에서 end 값까지의 숫자를",
    "3. 어떻게: react-countup을 통해 duration 시간 동안 부드럽게 카운팅하며, unit과 unitPosition에 따라 단위를 표시하고 useEasing으로 자연스러운 변화 효과 적용"
  ],
  advancedLearning: {
    propsList: [
      { name: "start", type: "number", description: "시작 숫자", required: true, default: 0 },
      { name: "end", type: "number", description: "최종 목표 숫자", required: true },
      { name: "unit", type: "string", description: "숫자에 표시할 단위 텍스트", required: true, default: "" },
      { name: "unitPosition", type: "enum", description: "단위 위치", required: true, default: "suffix", options: ["prefix", "suffix"] },
      { name: "unitVariant", type: "string", description: "단위 텍스트 Typography variant", required: false, default: "body1" },
      { name: "duration", type: "number", description: "애니메이션 지속 시간(초)", required: true, default: 2 },
      { name: "decimals", type: "number", description: "소수점 자릿수", required: false, default: 0 },
      { name: "decimal", type: "string", description: "소수점 구분자", required: false, default: "." },
      { name: "separator", type: "string", description: "천 단위 구분자", required: false, default: "," },
      { name: "useEasing", type: "boolean", description: "이징 효과 사용 여부", required: false, default: true },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false, default: {} },
      { name: "enableScrollSpy", type: "boolean", description: "스크롤 시 애니메이션 시작 여부", required: false, default: false },
      { name: "scrollSpyDelay", type: "number", description: "스크롤 감지 후 지연 시간", required: false },
      { name: "scrollSpyOnce", type: "boolean", description: "스크롤 애니메이션 한 번만 실행 여부", required: false, default: true },
    ],
    requiredKnowledge: [
      {
        name: "react-countup",
        role: "숫자 카운팅 애니메이션을 쉽게 구현하는 전용 라이브러리",
        type: "Library",
      },
      {
        name: "MUI Typography",
        role: "텍스트 스타일링과 variant 시스템 제공",
        type: "Component Library",
      },
      {
        name: "Box Layout",
        role: "단위 텍스트와 숫자의 정렬 및 레이아웃 제어",
        type: "CSS",
      },
      {
        name: "useMemo",
        role: "digitWidth 계산 최적화를 통한 고정폭 레이아웃 구현",
        type: "React Hook",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "enableScrollSpy 활성화 시 뷰포트 진입 또는 컴포넌트 마운트 시점",
    interactiveTarget: "start에서 end까지의 숫자 값",
    interactiveProperty: "react-countup 기반 카운팅 애니메이션과 단위 텍스트 표시, useEasing으로 자연스러운 변화 효과"
  }
};

// 인터랙티브 타이포그래피 레시피
export const interactiveTypography = {
  title: "Interactive Typography",
  basicIdea:
    "마우스 커서와의 거리에 따라 글자의 굵기와 크기가 동적으로 변화하는 효과",
  examples: ["헤드라인", "버튼 텍스트", "인터랙티브 메뉴"],
  expectedPrompt: "마우스 위치에 따라 개별 글자의 굵기와 크기가 동적으로 변하는 InteractiveTypography 컴포넌트를 만들어주세요. 텍스트 내용은 children prop으로 전달하고, initialWeight와 hoverWeight로 기본 굵기와 최대 굵기를 조절할 수 있게 해주세요. hoverSizeRatio로 크기 변화 비율을, transitionDuration으로 전환 속도를, effectRadius로 마우스 효과 반경을 제어할 수 있도록 구현해주세요. intensityFactor로 효과 집중도를, variant로 텍스트 스타일을 지정할 수 있게 해주세요.",
  detailedProcess: [
    "1. 언제: 마우스가 텍스트 영역 안에서 움직일 때",
    "2. 무엇을: 텍스트의 각 개별 글자를",
    "3. 어떻게: 마우스와의 거리에 따라 글자 크기와 굵기가 변화하며, 가까울수록 크고 굵게, 멀어질수록 원래대로 부드럽게 전환"
  ],
  advancedLearning: {
    propsList: [
      { name: "children", type: "string", description: "인터랙티브 효과를 적용할 텍스트", required: true },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "body1", options: variantList },
      { name: "initialWeight", type: "number", description: "기본 글자 굵기", required: true, default: 400 },
      { name: "hoverWeight", type: "number", description: "호버 시 최대 글자 굵기", required: true, default: 700 },
      { name: "hoverSizeRatio", type: "number", description: "크기 변화 비율 (퍼센트)", required: true, default: 20 },
      { name: "transitionDuration", type: "number", description: "전환 애니메이션 지속 시간 (초)", required: true, default: 0.1 },
      { name: "effectRadius", type: "number", description: "마우스 효과 반경 (픽셀)", required: true, default: 150 },
      { name: "intensityFactor", type: "number", description: "마우스 주변 효과 집중도", required: true, default: 2.5 },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false },
    ],
    requiredKnowledge: [
      {
        name: "DOM Manipulation",
        role: "텍스트를 개별 글자로 분리하고 각 글자에 동적 스타일 적용",
        type: "JavaScript",
      },
      {
        name: "Mouse Events",
        role: "마우스 위치 감지와 실시간 거리 계산을 통한 인터랙션 구현",
        type: "JavaScript",
      },
      {
        name: "getBoundingClientRect",
        role: "각 글자의 화면상 위치와 크기 정보를 정확히 계산",
        type: "DOM API",
      },
      {
        name: "CSS Transitions",
        role: "글자 크기와 굵기 변화의 부드러운 전환 효과 구현",
        type: "CSS",
      },
      {
        name: "requestAnimationFrame",
        role: "마우스 움직임에 따른 잦은 스타일 변경을 성능 최적화하여 처리",
        type: "JavaScript",
      },
      {
        name: "useRef & useEffect",
        role: "DOM 요소 참조와 이벤트 리스너 생명주기 관리",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스 커서가 텍스트 영역 안에서 움직일 때",
    interactiveTarget: "텍스트의 각 개별 글자",
    interactiveProperty: "마우스와의 거리에 따라 글자의 크기(font-size)와 굵기(font-weight)가 동적으로 변화"
  }
};

// 페이드인 타이포그래피 레시피
export const fadeInTypography = {
  title: "Fade In Typography",
  basicIdea:
    "문장을 단어별로 순차적으로 나타나게 하는 효과",
  examples: ["제목 강조", "문단 소개", "슬로건 표시"],
  expectedPrompt: "문장을 단어별로 순차적으로 나타나게 하는 FadeInTypography 컴포넌트를 만들어주세요. text prop으로 표시할 문장을, variant prop으로 텍스트 스타일을, direction prop으로 등장 방향을 설정할 수 있도록 해주세요. keepVisible prop으로 뷰포트 이탈 시 유지 여부를, speed prop으로 등장 속도를, wordDelay prop으로 단어간 딜레이를 조절할 수 있게 구현해주세요.",
  detailedProcess: [
    "1. 언제: 뷰포트에 진입했을 때",
    "2. 무엇을: 문장의 각 단어를",
    "3. 어떻게: 설정된 방향에서 순차적으로 나타나며, 딜레이에 따라 단어별로 시차를 두고 등장"
  ],
  advancedLearning: {
    propsList: [
      { name: "text", type: "string", description: "표시할 문장", required: true, default: "Hello world from designers" },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "body1", options: variantList },
      { name: "direction", type: "enum", description: "단어 등장 방향", required: true, default: "up", options: ["up", "down", "left", "right", "fade"] },
      { name: "color", type: "string", description: "텍스트 색상", required: true, default: "inherit" },
      { name: "keepVisible", type: "boolean", description: "뷰포트 벗어날 때 유지 여부", required: true, default: true },
      { name: "speed", type: "number", description: "각 단어 등장 속도 (ms)", required: true, default: 500 },
      { name: "wordDelay", type: "number", description: "단어간 딜레이 시간 (ms)", required: true, default: 100 },
      { name: "sx", type: "object", description: "추가 스타일 객체", required: false },
    ],
    requiredKnowledge: [
      {
        name: "useIsInView",
        role: "뷰포트 진입 감지로 애니메이션 시작 타이밍 제어",
        type: "Custom Hook",
      },
      {
        name: "useState (Set)",
        role: "보이는 단어들의 인덱스를 Set으로 관리하여 중복 방지와 효율적 상태 추적",
        type: "React",
      },
      {
        name: "useRef",
        role: "setTimeout 참조들을 배열로 관리하여 컴포넌트 언마운트 시 정리",
        type: "React",
      },
      {
        name: "CSS Transitions",
        role: "transform과 opacity의 부드러운 전환을 위한 cubic-bezier 이징 적용",
        type: "CSS",
      },
      {
        name: "String.split",
        role: "문장을 공백 기준으로 단어별로 분리하여 개별 제어",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컴포넌트가 뷰포트에 진입했을 때",
    interactiveTarget: "문장의 각 개별 단어",
    interactiveProperty: "단어별로 설정된 방향에서 순차적으로 나타나는 transform과 opacity 애니메이션"
  }
};

// 단어 스위처 타이포그래피 레시피
export const wordSwitcherTypography = {
  title: "Word Switcher Typography",
  basicIdea:
    "2개 이상의 단어의 철자가 섞이면서 전환되는 효과",
  examples: ["슬라이드 쇼 텍스트", "키워드 강조", "기능 리스트"],
  expectedPrompt: "여러 단어를 스크램블 효과와 함께 순환 전환하는 WordSwitcherTypography 컴포넌트를 만들어주세요. 컴포넌트는 words prop으로 전환할 단어 목록을 받고, interval prop으로 각 단어의 표시 시간을, scrambleDuration prop으로 스크램블 전환 속도를 조절할 수 있어야 합니다. variant prop으로 텍스트 스타일을 지정할 수 있으며, 자동 랜덤 문자 생성으로 자연스러운 스크램블 효과를 구현해주세요.",
  detailedProcess: [
    "1. 언제: 화면에 등장한 후 설정된 시간이 경과할 때마다",
    "2. 무엇을: 현재 표시된 단어를",
    "3. 어떻게: 무작위 문자로 섞이면서 다음 단어로 점진적 변화하며, 모든 단어를 반복적으로 순환"
  ],
  advancedLearning: {
    propsList: [
      { name: "words", type: "string[]", description: "전환할 단어 배열 (2개 이상)", required: true },
      { name: "variant", type: "enum", description: "Typography 변형", required: true, default: "h1", options: variantList },
      { name: "interval", type: "number", description: "각 단어 안정 상태 유지 시간 (ms)", required: false, default: 2000 },
      { name: "scrambleDuration", type: "number", description: "스크램블 전환 애니메이션 시간 (ms)", required: false, default: 800 },
      { name: "sx", type: "object", description: "MUI sx prop 추가 스타일", required: false },
    ],
    requiredKnowledge: [
      {
        name: "useState & useRef",
        role: "현재 단어 인덱스, 표시 텍스트, 애니메이션 상태 관리",
        type: "React",
      },
      {
        name: "useEffect & useCallback",
        role: "컴포넌트 생명주기와 스크램블 애니메이션 함수 메모이제이션",
        type: "React",
      },
      {
        name: "requestAnimationFrame",
        role: "스크램블 효과의 부드러운 프레임별 텍스트 변화 처리",
        type: "JavaScript",
      },
      {
        name: "setTimeout",
        role: "단어 간 전환 타이밍과 안정 상태 유지 시간 제어",
        type: "JavaScript",
      },
      {
        name: "Math.random & String Manipulation",
        role: "무작위 문자 생성과 진행도 기반 문자 교체 로직",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "설정된 interval 시간이 경과할 때마다 자동으로",
    interactiveTarget: "화면에 표시된 단어 텍스트",
    interactiveProperty: "텍스트가 무작위 문자로 스크램블되었다가 새로운 단어로 변하는 전환 효과"
  }
};