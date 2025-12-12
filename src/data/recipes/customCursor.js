export const cssCursor = {
  title: "CSS Cursor",
  basicIdea:
    "CssCursor 컴포넌트와 useCssCursor 훅을 활용하여 웹사이트의 마우스 커서를 커스텀 이미지로 변경하는 기능을 구현합니다. 컴포넌트 방식과 훅 방식 두 가지 접근법을 제공합니다.",
  examples: ["브랜드 아이덴티티", "게임 인터페이스", "크리에이티브 포트폴리오", "인터랙티브 콘텐츠"],
  expectedPrompt:
    "마우스 커서를 커스텀 이미지로 변경하는 기능을 만들어줘. CssCursor 컴포넌트로 특정 영역에만 적용하거나, useCssCursor 훅으로 전체 페이지에 적용할 수 있게 해줘. 커서 이미지 URL과 핫스팟 좌표를 설정할 수 있고, 모바일에서는 자동으로 비활성화되게 해줘. 이미지 로드 실패 시 fallback 커서도 지원하고, prefers-reduced-motion을 고려해서 접근성도 챙겨줘.",
  detailedProcess: [
    "1. 언제: 컴포넌트가 마운트될 때부터 언마운트될 때까지",
    "2. 무엇을: 브라우저의 기본 마우스 커서를",
    "3. 어떻게: 지정된 이미지 URL로 변경하며, 핫스팟 좌표로 클릭 지점 조정",
    "4. 최적화: 이미지 프리로드와 미디어 쿼리를 통한 성능 최적화 및 접근성 고려",
    "5. 유연성: 컴포넌트 방식으로 부분 적용 또는 훅 방식으로 전역 적용",
  ],
  advancedLearning: {
    propsList: [
      // CssCursor 컴포넌트 Props
      {
        name: "children",
        type: "React.ReactNode",
        description: "커서가 적용될 영역의 자식 요소들",
        required: true,
        component: "CssCursor",
      },
      {
        name: "cursor",
        type: "string",
        description: "커서로 사용할 이미지 URL 또는 CSS 기본 커서 이름",
        required: true,
        component: "CssCursor",
      },
      {
        name: "hotspot",
        type: "array",
        description: "커서 이미지의 클릭 지점 좌표 [x, y]",
        required: false,
        default: "[0, 0]",
        component: "CssCursor",
      },
      {
        name: "fallback",
        type: "string",
        description: "이미지 로드 실패 시 사용할 fallback 커서",
        required: false,
        default: "auto",
        component: "CssCursor",
      },
      {
        name: "hideOnMobile",
        type: "boolean",
        description: "모바일 기기에서 커서 숨김 여부",
        required: false,
        default: true,
        component: "CssCursor",
      },
      {
        name: "preload",
        type: "boolean",
        description: "커서 이미지 미리 로드 여부",
        required: false,
        default: false,
        component: "CssCursor",
      },
      {
        name: "sx",
        type: "object",
        description: "추가 스타일 객체 (MUI sx prop)",
        required: false,
        default: "{}",
        component: "CssCursor",
      },
      // useCssCursor 훅 Options
      {
        name: "scope",
        type: "HTMLElement|Window",
        description: "커서를 적용할 범위 (기본값: window)",
        required: false,
        default: "window",
        component: "useCssCursor",
      },
      {
        name: "mediaQuery",
        type: "string",
        description: "커서 적용 조건을 위한 미디어 쿼리",
        required: false,
        default: "(min-width: 768px)",
        component: "useCssCursor",
      },
      {
        name: "respectMotionPreference",
        type: "boolean",
        description: "prefers-reduced-motion 설정 고려 여부",
        required: false,
        default: true,
        component: "useCssCursor",
      },
    ],
    requiredKnowledge: [
      {
        name: "React useEffect",
        role: "컴포넌트 라이프사이클에 따른 커서 적용/해제",
        type: "react",
      },
      {
        name: "React useRef",
        role: "원본 커서 스타일과 이미지 객체 참조 저장",
        type: "react",
      },
      {
        name: "CSS cursor 속성",
        role: "브라우저 커서 모양 변경을 위한 기본 CSS 속성",
        type: "css",
      },
      {
        name: "Web API (Image)",
        role: "커서 이미지 프리로드와 로드 상태 확인",
        type: "js",
      },
      {
        name: "Media Queries",
        role: "반응형 디자인과 사용자 환경 설정 감지",
        type: "css",
      },
      {
        name: "MUI Box Component",
        role: "CssCursor 컴포넌트의 기본 래퍼 컴포넌트",
        type: "mui",
      },
      {
        name: "Custom Hooks Pattern",
        role: "React 커스텀 훅을 통한 로직 재사용성",
        type: "react",
      },
    ],
    usageExamples: [
      {
        title: "기본 CssCursor 컴포넌트 사용",
        code: `<CssCursor 
  cursor="/cursors/custom-arrow.png" 
  hotspot={[12, 0]}
  preload={true}
>
  <div>커스텀 커서가 적용될 영역</div>
</CssCursor>`,
        description: "특정 영역에만 커스텀 커서를 적용하는 기본 사용법"
      },
      {
        title: "useCssCursor 훅 사용",
        code: `const { changeCursor, resetCursor } = useCssCursor(
  '/cursors/star.png',
  {
    hotspot: [24, 24],
    preload: true,
    hideOnMobile: true,
  }
);

// 동적 커서 변경
changeCursor('/cursors/heart.png', { hotspot: [20, 20] });

// 커서 리셋
resetCursor();`,
        description: "전체 페이지에 커서를 적용하고 동적으로 변경하는 방법"
      },
      {
        title: "CSS 기본 커서와 혼용",
        code: `// CSS 기본 커서 사용
useCssCursor('grab');

// 커스텀 이미지와 CSS 기본 커서 조합
<CssCursor cursor="pointer">
  <button>기본 pointer 커서</button>
</CssCursor>`,
        description: "CSS 기본 커서와 커스텀 이미지를 함께 사용하는 방법"
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "컴포넌트가 마운트되어 있거나 훅이 활성화되어 있는 동안",
    interactiveTarget: "마우스 커서",
    interactiveProperty: "커서의 모양이 지정된 영역 또는 전체 페이지에서 커스텀 이미지나 CSS 기본 커서로 변경되는 효과",
  },
  implementationApproaches: {
    component: {
      name: "CssCursor 컴포넌트",
      description: "특정 영역에만 커서를 적용하고 싶을 때 사용",
      advantages: [
        "영역별 다른 커서 적용 가능",
        "컴포넌트 기반으로 재사용성 높음",
        "자식 요소들에 자동 상속",
        "MUI 스타일 시스템과 호환"
      ],
      disadvantages: [
        "전체 페이지 적용에는 부적합",
        "여러 컴포넌트 사용 시 성능 고려 필요"
      ]
    },
    hook: {
      name: "useCssCursor 훅",
      description: "전체 페이지 또는 특정 scope에 커서를 적용하고 싶을 때 사용",
      advantages: [
        "전체 페이지 적용에 최적화",
        "동적 커서 변경 가능",
        "scope 지정으로 유연한 적용 범위",
        "프로그래매틱한 제어 가능"
      ],
      disadvantages: [
        "영역별 다른 커서 적용 시 복잡함",
        "직접적인 DOM 조작 필요"
      ]
    }
  }
};

export const pointRingCursor = {
  title: "Point Ring Cursor",
  basicIdea:
    "작은 점과 바깥 링으로 구성된 커서로, 각각 다른 부드러운 움직임 계수(lerp)를 적용해 자연스러운 따라오기 효과를 만들며, 클릭 시 탄성 스케일 애니메이션이 적용됩니다.",
  examples: ["인터랙티브 포트폴리오", "모던 웹사이트", "게임 인터페이스", "브랜드 경험"],
  expectedPrompt:
    "Point Ring 커서를 만들어줘. 작은 점과 링이 각각 다른 부드러운 움직임 계수(lerp)로 마우스를 따라가게 해줘. 점은 빠르게, 링은 느리게 따라오는 레이어드 애니메이션 효과를 만들어줘. 클릭할 때 점은 확대되고 링은 축소되는 탄성 애니메이션을 적용해줘. lerp 값을 조절해서 움직임을 커스터마이징할 수 있게 해줘.",
  detailedProcess: [
    "1. 언제: 마우스가 움직이거나 클릭할 때",
    "2. 무엇을: 중심점과 바깥 링을",
    "3. 어떻게: 서로 다른 lerp 계수로 부드럽게 따라오며, 클릭 시 스케일 애니메이션으로 피드백 제공",
    "4. 커스터마이징: pointLerp와 ringLerp 값을 조절해서 원하는 부드러운 움직임 연출",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "color",
        type: "color",
        description: "커서의 색상",
        required: true,
        default: "#ff6b6b",
      },
      {
        name: "pointSize",
        type: "number",
        description: "중심점 크기(px)",
        required: false,
        default: 8,
      },
      {
        name: "ringSize",
        type: "number",
        description: "링 크기(px)",
        required: false,
        default: 32,
      },
      {
        name: "pointLerp",
        type: "number",
        description: "점의 부드러운 움직임 계수 (0.1-1.0, 높을수록 빠름)",
        required: false,
        default: 0.3,
      },
      {
        name: "ringLerp",
        type: "number",
        description: "링의 부드러운 움직임 계수 (0.1-1.0, 높을수록 빠름)",
        required: false,
        default: 0.15,
      },
    ],
    requiredKnowledge: [
      {
        name: "Linear Interpolation (Lerp)",
        role: "부드러운 움직임을 위한 선형 보간 알고리즘",
        type: "JavaScript",
      },
      {
        name: "requestAnimationFrame",
        role: "마우스 위치 추적을 위한 고성능 애니메이션 프레임 제어",
        type: "JavaScript",
      },
      {
        name: "Mouse Event Handling",
        role: "클릭, 마우스다운, 마우스업 이벤트 감지 및 처리",
        type: "JavaScript",
      },
      {
        name: "CSS Transform",
        role: "GPU 가속 위치 이동과 스케일 변화를 위한 CSS 변형",
        type: "CSS",
      },
      {
        name: "React State Management",
        role: "마우스 위치와 클릭 상태를 실시간으로 관리",
        type: "React",
      },
    ],
    usageExamples: [
      {
        title: "기본 Point Ring 커서",
        code: `// 커스텀 이벤트로 상태 전달
const event = new CustomEvent('cursorStateChange', {
  detail: { 
    variant: 'point-ring', 
    color: '#ff6b6b',
    pointLerp: 0.3,  // 점은 빠르게
    ringLerp: 0.15   // 링은 느리게
  }
});
window.dispatchEvent(event);`,
        description: "기본 설정으로 Point Ring 커서를 적용하는 방법"
      },
      {
        title: "매우 부드러운 움직임",
        code: `// 매우 부드럽고 느린 움직임
const smoothEvent = new CustomEvent('cursorStateChange', {
  detail: { 
    variant: 'point-ring', 
    color: '#00b7ff',
    pointLerp: 0.1,  // 점도 느리게
    ringLerp: 0.05   // 링은 더 느리게
  }
});
window.dispatchEvent(smoothEvent);`,
        description: "매우 부드럽고 느린 움직임으로 우아한 효과 연출"
      },
      {
        title: "동일한 속도로 움직임",
        code: `// 점과 링이 동일한 속도로 움직임
const syncEvent = new CustomEvent('cursorStateChange', {
  detail: { 
    variant: 'point-ring', 
    color: '#ffa500',
    pointLerp: 0.8,  // 점과 링 동일한 속도
    ringLerp: 0.8
  }
});
window.dispatchEvent(syncEvent);`,
        description: "점과 링이 동일한 속도로 움직여 일체감 있는 효과 연출"
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 움직이거나 클릭/드래그 할 때",
    interactiveTarget: "중심점과 바깥 링 요소",
    interactiveProperty: "각각 다른 lerp 계수로 부드럽게 위치가 추적되며, 클릭 시 스케일이 탄성 애니메이션으로 변화",
  },
};

export const spotlightCursor = {
  title: "Spotlight Cursor",
  basicIdea:
    "마우스 위치를 중심으로 원형 마스킹을 적용하여 해당 영역만 밝게 표시하고 나머지는 어둡게 만드는 스포트라이트 효과입니다.",
  examples: ["포커스 유도", "게임 HUD", "프레젠테이션", "시각적 강조", "몰입형 경험"],
  expectedPrompt:
    "스포트라이트 커서를 만들어줘. 마우스 위치를 중심으로 원형 마스킹을 적용해서 그 영역만 밝게 보이고 나머지는 어둡게 해줘. 스포트라이트 반지름과 어둠의 강도를 조절할 수 있게 해줘. GPU 가속을 위해 CSS mask 속성을 사용해줘.",
  detailedProcess: [
    "1. 언제: 마우스가 화면에서 움직일 때",
    "2. 무엇을: 전체 화면에 어두운 오버레이를",
    "3. 어떻게: 마우스 위치 중심으로 원형 마스킹을 적용하여 해당 영역만 투명하게 만들어 스포트라이트 효과 연출",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "radius",
        type: "number",
        description: "스포트라이트 반지름(px)",
        required: false,
        default: 150,
      },
      {
        name: "intensity",
        type: "number",
        description: "어둠 강도 (0.0-1.0)",
        required: false,
        default: 0.3,
      },
      {
        name: "gradientWidth",
        type: "number",
        description: "그라데이션 경계 너비 비율 (0-100%)",
        required: false,
        default: 70,
      },
    ],
    requiredKnowledge: [
      {
        name: "CSS mask-image",
        role: "GPU 가속 원형 마스킹으로 고성능 스포트라이트 효과 구현",
        type: "CSS",
      },
      {
        name: "CSS Custom Properties",
        role: "실시간 마우스 위치를 CSS 변수로 전달하여 마스크 위치 업데이트",
        type: "CSS",
      },
      {
        name: "requestAnimationFrame",
        role: "마우스 움직임에 따른 부드러운 마스크 위치 업데이트",
        type: "JavaScript",
      },
      {
        name: "Radial Gradient",
        role: "원형 그라데이션으로 자연스러운 스포트라이트 경계 생성",
        type: "CSS",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 화면에서 움직일 때",
    interactiveTarget: "전체 화면을 덮는 마스크 오버레이",
    interactiveProperty: "마우스 위치를 중심으로 한 원형 투명 영역이 실시간으로 이동하며 스포트라이트 효과 생성",
  },
};

export const customTooltipCursor = {
  title: "Custom Tooltip Cursor",
  basicIdea:
    "마우스를 따라다니는 'O' 형태의 커서로, 클릭 시 'D' 모양으로 변하며 특정 요소에 마우스 오버 시 툴팁 정보를 표시하는 인터랙티브 커서입니다.",
  examples: ["인터랙티브 포트폴리오", "제품 가이드", "튜토리얼 인터페이스", "브랜드 경험"],
  expectedPrompt:
    "툴팁 기능이 있는 커스텀 커서를 만들어줘. 평소에는 'O' 모양이고 클릭할 때 'D' 모양으로 변해. 링크나 버튼에 호버하면 크기가 커지고 글로우 효과가 생기게 해줘. 특정 이벤트로 툴팁 내용을 받아서 커서 옆에 표시할 수 있게 해줘. 테마에 따라 색상도 자동으로 바뀌게 해줘.",
  detailedProcess: [
    "1. 언제: 마우스가 움직이거나 특정 요소에 호버할 때",
    "2. 무엇을: 원형 커서와 툴팁 텍스트를",
    "3. 어떻게: 마우스 추적과 상황별 모양 변화, 이벤트 기반 툴팁 표시로 인터랙티브 피드백 제공",
  ],
  advancedLearning: {
    propsList: [
      {
        name: "size",
        type: "number",
        description: "커서의 기본 크기(px)",
        required: false,
        default: 40,
      },
      {
        name: "borderWidth",
        type: "number",
        description: "커서 테두리 두께(px)",
        required: false,
        default: 6,
      },
      {
        name: "lag",
        type: "number",
        description: "마우스 추적 지연 시간(0.0-1.0)",
        required: false,
        default: 0.1,
      },
    ],
    requiredKnowledge: [
      {
        name: "requestAnimationFrame",
        role: "마우스 위치 추적을 위한 고성능 애니메이션 프레임 제어",
        type: "JavaScript",
      },
      {
        name: "Custom Events",
        role: "컴포넌트 간 툴팁 데이터 전달을 위한 이벤트 시스템",
        type: "JavaScript",
      },
      {
        name: "useRef",
        role: "DOM 조작과 애니메이션 값 저장을 위한 참조 관리",
        type: "React",
      },
      {
        name: "CSS Transform",
        role: "커서 위치 이동과 크기 변화를 위한 GPU 가속 변형",
        type: "CSS",
      },
      {
        name: "Event Listeners",
        role: "마우스 이벤트와 링크 호버 감지를 위한 이벤트 처리",
        type: "JavaScript",
      },
    ],
  },
  ideaConcretization: {
    interactiveCondition: "마우스가 움직이거나 특정 요소에 호버하거나 툴팁 이벤트가 발생할 때",
    interactiveTarget: "원형 커서와 툴팁 텍스트 영역",
    interactiveProperty: "커서 모양이 상황에 따라 변화하고, 툴팁 내용이 동적으로 표시되는 효과",
  },
};