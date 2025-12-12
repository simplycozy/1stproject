/**
 * Visual Hook 관련 레시피 데이터
 */

export const animatedPath = {
  title: "Animated Path",
  basicIdea: "선이나 도형이 손으로 그리듯이 순서대로 나타나는 애니메이션 효과",
  examples: ["로고 애니메이션", "아이콘 등장 효과", "그래픽 요소 강조"],
  expectedPrompt: "SVG path를 선이 그려지는 것처럼 애니메이션으로 표현. triggerMode로 수동/뷰포트 트리거 선택, data는 SVG path 데이터, duration은 그리기 시간, color는 선 색상, strokeWidth는 선 굵기 설정",
  
  detailedProcess: [
    "1. 언제: SVG 요소가 화면에 등장할 때",
    "2. 무엇을: SVG path를",
    "3. 어떻게: stroke-dasharray를 이용해 선이 그려지듯 순차적으로",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "data", type: "string", description: "SVG path의 d 속성값 (경로 데이터)", required: true },
      { name: "duration", type: "number", description: "애니메이션 지속 시간(ms)", required: true, default: 600 },
      { name: "color", type: "string", description: "path 선의 색상", required: true, default: "#ffffff" },
      { name: "strokeWidth", type: "number", description: "선의 굵기", required: true, default: 44 },
      { name: "startDelay", type: "number", description: "애니메이션 시작 지연 시간(ms)", required: false, default: 0 },
      { name: "isReverse", type: "boolean", description: "역방향 애니메이션 (사라지기) 여부", required: false, default: false },
      { name: "scale", type: "number", description: "전체 크기 비율", required: true, default: 1 },
      { name: "triggerMode", type: "string", description: "트리거 방식 ('manual' | 'viewport')", required: false, default: "manual" },
      { name: "isTrigger", type: "boolean", description: "수동 트리거 활성화 여부 (triggerMode='manual'일 때)", required: false, default: true },
      { name: "viewportOptions", type: "object", description: "뷰포트 감지 옵션 (triggerMode='viewport'일 때)", required: false, default: "{}" },
    ],
    requiredKnowledge: [
      {
        name: "SVG Path",
        role: "벡터 그래픽의 경로를 정의하고 복잡한 도형과 선을 표현",
        type: "SVG",
      },
      {
        name: "d3.js",
        role: "DOM 조작과 데이터 시각화를 위한 JavaScript 라이브러리",
        type: "JavaScript",
      },
      {
        name: "stroke-dasharray",
        role: "SVG 선의 점선 패턴을 정의하여 애니메이션 효과 구현",
        type: "CSS/SVG",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "수동 트리거 발생 시 또는 요소가 뷰포트에 진입했을 때",
    interactiveTarget: "SVG path 요소",
    interactiveProperty: "stroke-dashoffset 값이 변화하면서 선이 점진적으로 그려짐"
  }
};

export const particleGeneratePath = {
  title: "Particle Generate Path",
  basicIdea: "SVG path를 따라 파티클이 생성되고 움직이며 stroke 범위에 걸쳐 분산되는 시각적 효과",
  examples: ["로고 파티클 효과", "경로 강조", "동적 시각 요소", "인터랙티브 그래픽"],
  expectedPrompt: "AnimatedUnit의 ParticlePathAnimator를 기반으로 한 독립 컴포넌트. SVG path를 따라 파티클이 움직이며 strokeWidth에 걸쳐 균등하게 분산. triggerMode로 수동/뷰포트 트리거 선택",
  
  detailedProcess: [
    "1. 언제: 트리거 발생 시 또는 요소가 뷰포트에 진입했을 때",
    "2. 무엇을: SVG path를 따라 파티클들을",
    "3. 어떻게: d3.js transition을 이용해 fade-in 후 path를 따라 이동하며 strokeWidth 범위에 분산",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "data", type: "string", description: "SVG path의 d 속성값 (경로 데이터)", required: true },
      { name: "duration", type: "number", description: "애니메이션 지속 시간(ms)", required: true, default: 2000 },
      { name: "color1", type: "string", description: "파티클 색상1 (랜덤 선택)", required: true, default: "#FFFFFF" },
      { name: "color2", type: "string", description: "파티클 색상2 (랜덤 선택)", required: true, default: "#FFFFFF" },
      { name: "particleNum", type: "number", description: "파티클 개수", required: true, default: 50 },
      { name: "particleSize", type: "number", description: "파티클 기본 크기", required: true, default: 3 },
      { name: "strokeWidth", type: "number", description: "파티클 분산 범위 (AnimatedUnit 기준)", required: false, default: 10 },
      { name: "startDelay", type: "number", description: "애니메이션 시작 지연 시간(ms)", required: false, default: 0 },
      { name: "scale", type: "number", description: "전체 크기 비율", required: true, default: 1 },
      { name: "particleType", type: "string", description: "파티클 형태 ('circle' | 'square' | 'triangle' | 'invertedTriangle')", required: false, default: "circle" },
      { name: "particleFadeInDuration", type: "number", description: "파티클 페이드인 시간(ms)", required: false, default: 500 },
      { name: "triggerMode", type: "string", description: "트리거 방식 ('manual' | 'viewport')", required: false, default: "manual" },
      { name: "isTrigger", type: "boolean", description: "수동 트리거 활성화 여부 (triggerMode='manual'일 때)", required: false, default: true },
      { name: "viewportOptions", type: "object", description: "뷰포트 감지 옵션 (triggerMode='viewport'일 때)", required: false, default: "{}" },
    ],
    requiredKnowledge: [
      {
        name: "SVG Path",
        role: "벡터 그래픽의 경로를 정의하고 파티클 이동 경로 제공",
        type: "SVG",
      },
      {
        name: "d3.js",
        role: "DOM 조작과 transition 기반 애니메이션 제어",
        type: "JavaScript",
      },
      {
        name: "ParticlePathAnimator",
        role: "AnimatedUnit에서 사용되는 파티클 애니메이션 로직의 기반",
        type: "Component",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "수동 트리거 발생 시 또는 요소가 뷰포트에 진입했을 때",
    interactiveTarget: "SVG path를 따라 움직이는 파티클들",
    interactiveProperty: "파티클의 위치, 크기, 투명도가 path를 따라 변화하며 strokeWidth 범위에 분산"
  }
};

export const animatedPathWithParticles = {
  title: "Animated Path With Particles",
  basicIdea: "SVG path가 그려지면서 동시에 파티클 효과도 함께 나타나는 결합된 시각적 효과",
  examples: ["로고 강화 애니메이션", "브랜딩 효과", "인터랙티브 디자인", "시각적 강조"],
  expectedPrompt: "AnimatedPath와 ParticleGeneratePath를 결합한 효과. path가 그려지면서 파티클이 함께 생성되어 더욱 역동적인 시각적 임팩트 제공. 각 효과의 타이밍과 스타일을 독립적으로 조절 가능",
  
  detailedProcess: [
    "1. 언제: 트리거 발생 시 또는 요소가 뷰포트에 진입했을 때",
    "2. 무엇을: SVG path가 그려지면서 동시에 파티클들이",
    "3. 어떻게: stroke-dasharray로 path를 그리고 d3.js로 파티클을 path를 따라 움직이게 하여 결합된 효과 연출",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "data", type: "string", description: "SVG path의 d 속성값 (경로 데이터)", required: true },
      { name: "pathDuration", type: "number", description: "path 그리기 애니메이션 지속 시간(ms)", required: true, default: 600 },
      { name: "particleDuration", type: "number", description: "파티클 애니메이션 지속 시간(ms)", required: true, default: 2000 },
      { name: "pathColor", type: "string", description: "path 선의 색상", required: true, default: "#FFFFFF" },
      { name: "particleColor1", type: "string", description: "파티클 색상1 (랜덤 선택)", required: true, default: "#FFFFFF" },
      { name: "particleColor2", type: "string", description: "파티클 색상2 (랜덤 선택)", required: true, default: "#FFFFFF" },
      { name: "strokeWidth", type: "number", description: "선의 굵기 및 파티클 분산 범위", required: true, default: 44 },
      { name: "particleNum", type: "number", description: "파티클 개수", required: true, default: 50 },
      { name: "particleSize", type: "number", description: "파티클 기본 크기", required: true, default: 4 },
      { name: "particleStartDelay", type: "number", description: "파티클 시작 지연 시간(ms)", required: false, default: 300 },
      { name: "startDelay", type: "number", description: "전체 애니메이션 시작 지연 시간(ms)", required: false, default: 0 },
      { name: "scale", type: "number", description: "전체 크기 비율", required: true, default: 1 },
      { name: "particleType", type: "string", description: "파티클 형태 ('circle' | 'square' | 'triangle' | 'invertedTriangle')", required: false, default: "circle" },
      { name: "triggerMode", type: "string", description: "트리거 방식 ('manual' | 'viewport')", required: false, default: "manual" },
      { name: "isTrigger", type: "boolean", description: "수동 트리거 활성화 여부 (triggerMode='manual'일 때)", required: false, default: true },
      { name: "viewportOptions", type: "object", description: "뷰포트 감지 옵션 (triggerMode='viewport'일 때)", required: false, default: "{}" },
    ],
    requiredKnowledge: [
      {
        name: "SVG Path",
        role: "벡터 그래픽의 경로를 정의하고 애니메이션과 파티클 이동 경로 제공",
        type: "SVG",
      },
      {
        name: "d3.js",
        role: "DOM 조작과 transition 기반 애니메이션 제어",
        type: "JavaScript",
      },
      {
        name: "AnimatedPath + ParticleGeneratePath",
        role: "두 컴포넌트의 결합된 효과로 더욱 풍부한 시각적 경험 제공",
        type: "Component",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "수동 트리거 발생 시 또는 요소가 뷰포트에 진입했을 때",
    interactiveTarget: "SVG path와 path를 따라 움직이는 파티클들",
    interactiveProperty: "path의 stroke-dashoffset과 파티클의 위치/투명도가 동시에 변화하여 결합된 시각적 효과"
  }
};

export const particleBackground = {
  title: "Particle Background",
  basicIdea: "3D 공간에서 마우스와 스크롤에 반응하는 파티클들이 배경을 이루는 인터랙티브 효과. 두 가지 사용법 지원: 간단한 children 기반 방식과 세밀한 제어를 위한 고급 props 방식",
  examples: ["풀페이지 섹션 배경", "인터랙티브 배경", "3D 시각 효과", "몰입형 사용자 경험", "섹션별 색상 전환"],
  expectedPrompt: "Three.js와 React Three Fiber로 3D 파티클 배경 효과 구현. 섹션별 자동 색상 전환과 줌 인터랙션 지원. 간단한 사용법: ParticleSection으로 콘텐츠 감싸기, 고급 사용법: sections 배열로 각 섹션 데이터 정의",
  
  detailedProcess: [
    "1. 언제: 페이지가 로드되고 사용자가 마우스를 움직이거나 스크롤할 때",
    "2. 무엇을: 3D 공간의 파티클들을",
    "3. 어떻게: 마우스 위치에 따라 이끌리고 스크롤 섹션에 따라 색상과 카메라 위치가 변화하며 배경을 형성",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "children", type: "ReactNode", description: "ParticleSection 배열 (새로운 간단한 방식)", required: false, default: "undefined" },
      { name: "sections", type: "array", description: "섹션 데이터 배열 (고급 사용법) - {id, particleColor, backgroundColor, movementSpeed, title, description}", required: false, default: "자동 생성" },
      { name: "particleCount", type: "number", description: "파티클 개수", required: true, default: 100 },
      { name: "particleSize", type: "number", description: "파티클 기본 크기", required: true, default: 0.12 },
      { name: "particleColor", type: "color", description: "파티클 색상 (sections 없을 때)", required: false, default: "#ADD8E6" },
      { name: "movementSpeed", type: "number", description: "파티클 움직임 속도 (sections 없을 때)", required: false, default: 0.00075 },
      { name: "movementRadius", type: "number", description: "파티클 움직임 반경", required: true, default: 20 },
      { name: "bloomStrength", type: "number", description: "블룸 효과 강도 (현재 비활성화)", required: false, default: 1 },
      { name: "bloomRadius", type: "number", description: "블룸 효과 반경 (현재 비활성화)", required: false, default: 0.3 },
      { name: "bloomThreshold", type: "number", description: "블룸 효과 임계값 (현재 비활성화)", required: false, default: 0.9 },
    ],
    requiredKnowledge: [
      {
        name: "Three.js",
        role: "3D 그래픽과 WebGL을 쉽게 사용할 수 있게 해주는 JavaScript 라이브러리",
        type: "JavaScript",
      },
      {
        name: "React Three Fiber",
        role: "React에서 Three.js를 선언적으로 사용할 수 있게 해주는 렌더러",
        type: "React",
      },
      {
        name: "GSAP ScrollTrigger",
        role: "스크롤 기반 애니메이션 트리거를 위한 라이브러리",
        type: "JavaScript",
      },
      {
        name: "InstancedMesh",
        role: "동일한 geometry를 가진 다수 객체를 효율적으로 렌더링하는 Three.js 기능",
        type: "Three.js",
      },
      {
        name: "ParticleSection",
        role: "간단한 사용법을 위한 섹션 래퍼 컴포넌트",
        type: "React Component",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "마우스 움직임이 감지되거나 스크롤이 발생했을 때",
    interactiveTarget: "3D 공간에 분포된 파티클들",
    interactiveProperty: "파티클의 위치가 마우스를 향해 이동하고, 스크롤 섹션에 따라 색상과 카메라 깊이가 변화함. 간단한 방식에서는 자동으로 섹션 감지 및 전환 처리"
  }
};

export const bubbleBackground = {
  title: "Bubble Background",
  basicIdea: "3D 공간에서 스크롤에 반응하며 위로 떠오르는 투명한 버블들이 배경을 이루는 인터랙티브 효과. 두 가지 사용법 지원: 간단한 children 기반 방식과 세밀한 제어를 위한 고급 props 방식",
  examples: ["웹사이트 배경", "몰입형 배경", "수중 효과", "공간감 있는 배경", "풀페이지 섹션 배경"],
  expectedPrompt: "Three.js와 React Three Fiber로 3D 버블 배경 효과 구현. 스크롤 진행률에 반응하는 버블 시스템. 간단한 사용법: BubbleSection으로 콘텐츠 감싸기, 고급 사용법: scrollProgress prop으로 직접 제어. 투명도와 물리적 재질로 현실적인 버블 표현",
  
  detailedProcess: [
    "1. 언제: 페이지가 로드되고 사용자가 스크롤할 때",
    "2. 무엇을: 3D 공간의 투명한 구체들을",
    "3. 어떻게: 스크롤에 따라 상승 속도가 변하며 자연스러운 진동과 함께 위로 떠오르는 효과",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "children", type: "ReactNode", description: "BubbleSection 배열 (새로운 간단한 방식)", required: false, default: "undefined" },
      { name: "scrollProgress", type: "number", description: "스크롤 진행률 (0-1) - 고급 사용법", required: false, default: "자동 계산" },
      { name: "bubbleCount", type: "number", description: "버블 개수", required: false, default: 120 },
    ],
    requiredKnowledge: [
      {
        name: "Three.js",
        role: "3D 그래픽과 WebGL을 쉽게 사용할 수 있게 해주는 JavaScript 라이브러리",
        type: "JavaScript",
      },
      {
        name: "React Three Fiber",
        role: "React에서 Three.js를 선언적으로 사용할 수 있게 해주는 렌더러",
        type: "React",
      },
      {
        name: "meshPhysicalMaterial",
        role: "물리 기반 렌더링으로 현실적인 투명도와 굴절 효과를 구현하는 Three.js 재질",
        type: "Three.js",
      },
      {
        name: "EffectComposer",
        role: "후처리 효과를 적용하여 시각적 품질을 향상시키는 Three.js 기능",
        type: "Three.js",
      },
      {
        name: "BubbleSection",
        role: "간단한 사용법을 위한 섹션 래퍼 컴포넌트",
        type: "React Component",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "스크롤이 발생했을 때",
    interactiveTarget: "3D 공간에 분포된 투명한 버블들",
    interactiveProperty: "버블의 상승 속도가 스크롤 진행률에 따라 변화하며 자연스러운 진동과 함께 움직임. 간단한 방식에서는 자동으로 스크롤 감지 및 처리"
  }
};

export const waveBackground = {
  title: "Wave Background",
  basicIdea: "3D 공간에서 스크롤과 마우스에 반응하는 동적인 물결이 배경을 이루는 인터랙티브 효과. 두 가지 사용법 지원: 간단한 children 기반 방식과 세밀한 제어를 위한 props 기반 방식",
  examples: ["풀페이지 섹션 배경", "히어로 섹션 배경", "인터랙티브 배경", "몰입형 웹 경험", "동적 비주얼"],
  expectedPrompt: "Three.js와 React Three Fiber로 셰이더 기반 웨이브 배경 효과 구현. 커스텀 셰이더로 정점 변형해 자연스러운 물결 표현. 간단한 사용법: WaveSection으로 콘텐츠 감싸기, 고급 사용법: scrollProgress와 mousePosition 직접 제어",
  
  detailedProcess: [
    "1. 언제: 페이지가 로드되고 사용자가 스크롤하거나 마우스를 움직일 때",
    "2. 무엇을: 3D 평면의 정점들을",
    "3. 어떻게: 사인 함수로 높낮이를 변화시켜 자연스러운 물결 효과로 표현",
  ],
  
  advancedLearning: {
    propsList: [
      { name: "children", type: "ReactNode", description: "WaveSection 배열 (새로운 간단한 방식)", required: false, default: "undefined" },
      { name: "scrollProgress", type: "number", description: "스크롤 진행률 (0-1) - 고급 사용법", required: false, default: "자동 계산" },
      { name: "mousePosition", type: "object", description: "마우스 위치 {x: 0-1, y: 0-1} - 고급 사용법", required: false, default: "자동 계산" },
      { name: "waveIntensity", type: "number", description: "웨이브 강도", required: false, default: 1.0 },
      { name: "waveSpeed", type: "number", description: "웨이브 속도", required: false, default: 1.0 },
      { name: "colorStart", type: "color", description: "시작 색상", required: false, default: "#0066ff" },
      { name: "colorEnd", type: "color", description: "끝 색상", required: false, default: "#00ffcc" },
    ],
    requiredKnowledge: [
      {
        name: "GLSL Shaders",
        role: "GPU에서 실행되는 정점과 픽셀 변형을 위한 셰이더 언어",
        type: "WebGL",
      },
      {
        name: "React Three Fiber",
        role: "React에서 Three.js를 선언적으로 사용할 수 있게 해주는 렌더러",
        type: "React",
      },
      {
        name: "Vertex Shader",
        role: "3D 정점의 위치를 변형하여 물결 효과를 만드는 셰이더",
        type: "GLSL",
      },
      {
        name: "Fragment Shader",
        role: "픽셀별 색상을 계산하여 그라데이션 효과를 만드는 셰이더",
        type: "GLSL",
      },
      {
        name: "WaveSection",
        role: "간단한 사용법을 위한 섹션 래퍼 컴포넌트",
        type: "React Component",
      },
    ],
  },
  
  ideaConcretization: {
    interactiveCondition: "스크롤이 발생하거나 마우스가 움직일 때",
    interactiveTarget: "3D 평면 메시의 정점들",
    interactiveProperty: "정점의 높이가 사인 함수로 변화하며 색상이 그라데이션으로 전환됨. 간단한 방식에서는 자동으로 스크롤과 마우스 이벤트 처리"
  }
}; 