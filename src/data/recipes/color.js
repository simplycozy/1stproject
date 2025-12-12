import { gradientPalettes } from '../gradientPalettes';

// 그라데이션 팔레트 ID들을 enum 옵션으로 추출
const gradientPaletteOptions = gradientPalettes.map(palette => palette.id);

export const gradientBox = {
  title: "Gradient Box",
  basicIdea:
    "CSS를 직접 수정하지 않고도 MUI 스타일 체계 내에서 다양한 그라데이션 배경을 쉽게 만들 수 있는 컴포넌트입니다.",
  examples: ["섹션 배경", "카드 배경", "버튼 배경"],
  expectedPrompt: "그라데이션 배경을 가진 컨테이너를 만들어줘. 선형, 원형, 원뿔형 그라데이션 타입을 선택할 수 있고, 색상 팔레트나 직접 색상 배열을 지정할 수 있게 해줘. 색상 대비 강도와 그라데이션 각도도 조절 가능하게 해줘. 노이즈 텍스처를 추가해서 자연스러운 입자감도 줄 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 컨테이너가 화면에 나타날 때",
    "2. 무엇을: 컨테이너의 배경을",
    "3. 어떻게: 선택한 타입과 색상으로 그라데이션 효과를 적용하며 표시",
  ],
  advancedLearning: {
    propsList: [
      // 🎨 핵심 Props (우선순위 높음)
      { name: "palette", type: "enum", description: "사용할 그라데이션 팔레트 이름", required: true, default: "sunsetGlow", options: gradientPaletteOptions },
      { name: "type", type: "enum", description: "그라데이션 타입 (linear=선형, radial=원형, conic=원뿔형)", required: true, default: "linear", options: ["linear", "radial", "conic"] },
      { name: "contrast", type: "enum", description: "색상 대비 강도 (ambient=균등, highlight=하이라이트, bigContrast=강한대비)", required: true, default: "ambient", options: ["ambient", "highlight", "bigContrast"] },
      
      // 🔊 시각 효과 Props (우선순위 중간)
      { name: "angle", type: "number", description: "linear 그라데이션의 각도 (0-360도)", required: true, default: 45 },
      { name: "animated", type: "boolean", description: "부드러운 애니메이션 효과 활성화", required: true, default: false },
      { name: "noise", type: "boolean", description: "노이즈 텍스처 적용 여부 (미세한 입자감)", required: true, default: false },
      { name: "noiseColor", type: "color", description: "노이즈 색상 (흰색/검정색 권장)", required: true, default: "#ffffff" },
      
      // ⚙️ 세부 조정 Props (우선순위 낮음)  
      { name: "animationDuration", type: "number", description: "애니메이션 지속시간 (초 단위)", required: true, default: 8 },
      { name: "noiseIntensity", type: "number", description: "노이즈 강도 (0.1=미세, 1.0=강함)", required: true, default: 0.3 },
      { name: "noiseType", type: "enum", description: "노이즈 질감 타입", required: true, default: "subtle", options: ["subtle", "medium", "strong"] },
    ],
    requiredKnowledge: [
      {
        name: "CSS Linear/Radial/Conic Gradients",
        role: "다양한 타입의 그라데이션 생성과 방향 제어",
        type: "CSS",
      },
      {
        name: "SVG Filter Effects",
        role: "노이즈 텍스처 생성을 위한 feTurbulence 필터 활용",
        type: "SVG",
      },
      {
        name: "MUI Box Component",
        role: "컨테이너 구조와 스타일링 시스템",
        type: "MUI",
      },
      {
        name: "Color Stop Positioning",
        role: "그라데이션 내 색상의 위치와 대비 강도 조절",
        type: "CSS",
      },
      {
        name: "CSS Blend Modes",
        role: "노이즈와 그라데이션의 자연스러운 합성 효과",
        type: "CSS",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컨테이너가 화면에 나타날 때",
    interactiveTarget: "컨테이너의 배경 영역",
    interactiveProperty: "선택된 타입과 설정에 따라 그라데이션 색상이 자연스럽게 블렌딩되어 표시됨"
  },
};

export const meshGradientBox = {
  title: "Mesh Gradient Box",
  basicIdea:
    "Canvas를 사용하여 부드러운 메시 형태의 그라데이션 배경을 생성하고, Simplex Noise를 통한 자연스러운 텍스처 효과와 다양한 애니메이션을 제공하는 컴포넌트입니다.",
  examples: ["히어로 섹션", "아트 배경", "창의적 레이아웃"],
  expectedPrompt: "Canvas로 메시 그라데이션 배경을 만들어줘. 여러 색상으로 부드러운 메시 효과를 생성하고, 포인트 개수와 배치 방식, 애니메이션 여부와 속도를 설정할 수 있게 해줘. Simplex 노이즈를 추가해서 자연스러운 텍스처 효과도 줄 수 있게 해줘. 해상도와 성능 옵션도 조절 가능하게 해줘.",
  detailedProcess: [
    "1. 언제: 컨테이너가 화면에 나타나고 애니메이션이 활성화된 경우",
    "2. 무엇을: Canvas를 통해 여러 색상 포인트들을",
    "3. 어떻게: 부드럽게 블렌딩하여 메시 형태의 그라데이션 패턴으로 표현하며 동적으로 움직임",
  ],
  advancedLearning: {
    propsList: [
      // 🎨 핵심 Props (우선순위 높음)
      { name: "colors", type: "color[]", description: "메시 그라데이션을 구성할 색상 배열", required: true, default: ["#121212", "#ff335A", "#0066FF"] },
      { name: "pointCount", type: "number", description: "그라데이션 메시 포인트 개수", required: true, default: 8 },
      { name: "distribution", type: "enum", description: "포인트 배치 패턴 (grid=격자, noise=불규칙, centered=중심방사)", required: true, default: "centered", options: ["grid", "noise", "centered"] },
      { name: "colorStrategy", type: "enum", description: "색상 적용 방식 (cycle=순환, random=랜덤, gradientMap=그라데이션맵)", required: true, default: "gradientMap", options: ["cycle", "random", "gradientMap"] },
      
      // 🔊 시각 효과 Props (우선순위 중간)
      { name: "randomness", type: "number", description: "포인트 배치 랜덤성 (0.0=균일, 1.0=완전랜덤)", required: true, default: 0.3 },
      { name: "animated", type: "boolean", description: "포인트 동적 애니메이션 효과", required: true, default: false },
      { name: "animationSpeed", type: "number", description: "포인트 움직임 속도 (0.1=느림, 3.0=빠름)", required: true, default: 1.5 },
      { name: "noiseEnabled", type: "boolean", description: "Simplex 노이즈 텍스처 효과", required: true, default: false },
      { name: "noiseIntensity", type: "number", description: "노이즈 강도 (0.0=없음, 1.0=최대)", required: true, default: 0.05 },
      
      // ⚙️ 세부 조정 Props (우선순위 낮음)
      { name: "animateColorShift", type: "boolean", description: "색상 변화 애니메이션", required: true, default: false },
      { name: "colorShiftSpeed", type: "number", description: "색상 변화 속도 배율 (0.1~2.0)", required: true, default: 0.1 },
      { name: "blendMode", type: "enum", description: "포인트 보간 방식", required: true, default: "radial", options: ["radial", "linear"] },
      { name: "falloff", type: "number", description: "거리 감쇠 강도 (0.5~4.0)", required: true, default: 1.5 },
      { name: "resolution", type: "number", description: "렌더링 해상도 비율 (0.1~1.0)", required: true, default: 0.4 },
      { name: "showPoints", type: "boolean", description: "포인트 위치 시각적 표시", required: true, default: false },
      { name: "noiseScale", type: "number", description: "노이즈 스케일 (작을수록 세밀)", required: true, default: 0.0005 },
      { name: "maxFPS", type: "number", description: "애니메이션 최대 FPS", required: true, default: 30 },
    ],
    requiredKnowledge: [
      {
        name: "HTML5 Canvas API",
        role: "실시간 그라데이션 렌더링과 픽셀 데이터 조작",
        type: "JavaScript",
      },
      {
        name: "Animation Timing",
        role: "프레임 단위 애니메이션 제어와 속도 조절",
        type: "JavaScript",
      },
      {
        name: "Color Interpolation",
        role: "여러 색상 포인트 간의 부드러운 블렌딩 계산",
        type: "JavaScript",
      },
      {
        name: "Performance Optimization",
        role: "애니메이션 프레임과 해상도 조절을 통한 성능 최적화",
        type: "JavaScript",
      },
      {
        name: "React Refs & Effects",
        role: "Canvas 요소 참조와 리사이즈 이벤트 관리",
        type: "React",
      },
      {
        name: "Simplex Noise Algorithm",
        role: "자연스러운 텍스처 생성을 위한 노이즈 알고리즘",
        type: "Algorithm",
      },
      {
        name: "Fractal Brownian Motion (FBM)",
        role: "멀티 옥타브 노이즈를 통한 복잡한 패턴 생성",
        type: "Algorithm",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컨테이너가 화면에 나타나고 애니메이션이 활성화된 경우",
    interactiveTarget: "Canvas에 렌더링된 색상 포인트들",
    interactiveProperty: "여러 색상이 부드럽게 블렌딩되며 메시 패턴을 형성하고, 설정된 속도로 포인트들이 움직이며 색상도 변화함. 노이즈가 활성화되면 Simplex 알고리즘으로 자연스러운 텍스처가 실시간으로 적용됨"
  },
};

export const scrollGradientBackground = {
  title: "Scroll Gradient Background",
  basicIdea:
    "스크롤 진행도에 따라 여러 색상 단계로 부드럽게 전환되는 전체 화면 배경 그라데이션입니다. 간단한 색상 이름 배열만 전달하면 자동으로 반응형 오비탈 시스템이 적용되어 몰입감 있는 시각적 경험을 제공합니다.",
  examples: ["랜딩 페이지 배경", "스토리텔링 사이트", "포트폴리오 배경"],
  expectedPrompt: "스크롤에 따라 배경 그라데이션이 동적으로 변하는 전체 화면 배경을 만들어줘. 섹션별 색상 이름 배열과 섹션 참조만 받아서, 자동으로 반응형 오비탈 애니메이션이 적용되게 해줘. 복잡한 설정 없이 간단한 API로 사용 가능하게 해줘.",
  detailedProcess: [
    "1. 언제: 사용자가 페이지를 스크롤할 때",
    "2. 무엇을: 전체 화면 배경의 그라데이션 색상을",
    "3. 어떻게: 섹션별로 정의된 색상으로 부드럽게 전환하며 자동 계산된 오비탈 패턴으로 움직임",
  ],
  advancedLearning: {
    propsList: [
      // 🎨 핵심 Props (우선순위 높음)
      { name: "sectionColors", type: "string[]", description: "섹션별 색상 팔레트 이름 배열 (예: ['pureRed', 'pureBlue', 'pureGreen'])", required: true, default: "pureRed,pureBlue,pureGreen,pureYellow" },
      
      // 🔊 시각 효과 Props (우선순위 중간)
      { name: "circleOpacity", type: "number", description: "원형 요소 투명도 (0.0=투명, 1.0=불투명)", required: true, default: 0.3 },
      { name: "colorIntensity", type: "number", description: "색상 집중도 (0.1=희미함, 1.0=진함)", required: true, default: 0.8 },
      { name: "blurIntensity", type: "number", description: "클러스터의 블러 강도 (px 단위)", required: true, default: 320 },
      { name: "orbitalType", type: "enum", description: "오비탈 움직임 패턴 타입", required: true, default: "rightBottom", options: ["rightBottom", "center", "corners"] },
      
      // ⚙️ 고급 설정 Props (우선순위 낮음)
      { name: "enableGlow", type: "boolean", description: "라디얼 클러스터의 발광 효과 활성화", required: true, default: false },
      { name: "maxCircles", type: "number", description: "최대 원형 요소 개수", required: true, default: 2 },
      { name: "enableAnimation", type: "boolean", description: "스크롤 기반 전환 애니메이션 활성화", required: true, default: true },
    ],
    requiredKnowledge: [
      {
        name: "GSAP ScrollTrigger",
        role: "스크롤 진행도에 따른 실시간 애니메이션 제어와 섹션 감지",
        type: "JavaScript",
      },
      {
        name: "Responsive Design",
        role: "화면 크기별 오비탈 패턴과 크기 자동 조정",
        type: "CSS",
      },
      {
        name: "Color Interpolation",
        role: "HEX 색상을 RGB로 변환하고 두 색상 사이의 중간값 계산",
        type: "JavaScript",
      },
      {
        name: "Automatic Configuration",
        role: "색상 팔레트 기반 자동 오비탈 설정 생성",
        type: "JavaScript",
      },
      {
        name: "React useEffect & useRef",
        role: "컴포넌트 생명주기와 DOM 요소 참조 관리",
        type: "React",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "사용자가 페이지를 스크롤할 때, 각 섹션이 화면에 나타나거나 사라질 때",
    interactiveTarget: "전체 화면의 배경에 자동 생성된 원형 클러스터들",
    interactiveProperty: "간단한 색상 배열만으로 복잡한 오비탈 애니메이션이 자동 적용되며, 반응형으로 화면 크기에 맞게 조정됨. 사용자는 복잡한 설정 없이 깔끔한 API로 고급 효과를 구현할 수 있음"
  },
};