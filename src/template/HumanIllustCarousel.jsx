import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import SVGPathCarousel from "../components/patterns/visualHook/SVGPathCarousel";
import { sendTooltipData, clearTooltipData } from "../utils/cursorUtils";

// SVG 이미지들 import
import Person1 from "../assets/illust/human/1.svg";
import Person2 from "../assets/illust/human/2.svg";
import Person3 from "../assets/illust/human/3.svg";
import Person4 from "../assets/illust/human/4.svg";
import Person5 from "../assets/illust/human/5.svg";
import Person6 from "../assets/illust/human/6.svg";
import Person7 from "../assets/illust/human/7.svg";
import Person8 from "../assets/illust/human/8.svg";
import Person9 from "../assets/illust/human/9.svg";

/**
 * HumanIllustCarousel 컴포넌트
 * 
 * Props:
 * @param {string} pathType - 캐러셀 경로 타입 (horizontal/circle/none) [Required]
 * @param {string} theme - 테마 모드 (light/dark) [Optional, 기본값: light]
 * @param {object} sx - MUI sx props [Optional]
 * @param {object} ...props - 기타 SVGPathCarousel props [Optional]
 *
 * Example usage:
 * <HumanIllustCarousel pathType="horizontal" theme="light" />
 * <HumanIllustCarousel pathType="circle" theme="dark" />
 */
// 테마 색상을 컴포넌트 외부로 이동 (상수화)
const THEME_COLORS = {
  light: {
    pathColor: '#000000',
    illustColor: '#000000'
  },
  dark: {
    pathColor: '#ffffff',
    illustColor: '#ffffff'
  }
};

// 반응형 element 사이즈 상수 정의
const RESPONSIVE_ELEMENT_SIZE = {
  xs: 48,   // 모바일
  sm: 80,   // 태블릿 세로
  md: 90,   // 태블릿 가로
  lg: 110,  // 데스크톱
  xl: 130   // 대형 화면
};

function HumanIllustCarousel({ pathType, theme = 'light', sx }) {
  const muiTheme = useTheme();
  
  // MUI 브레이크포인트 확인 (최상위에서 훅 사용)
  const isXl = useMediaQuery(muiTheme.breakpoints.up('xl'));
  const isLg = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const isSm = useMediaQuery(muiTheme.breakpoints.up('sm'));
  
  // 반응형 elementSize 계산 (내부 고정값 사용)
  const getCurrentElementSize = () => {
    if (isXl) return RESPONSIVE_ELEMENT_SIZE.xl;
    if (isLg) return RESPONSIVE_ELEMENT_SIZE.lg;
    if (isMd) return RESPONSIVE_ELEMENT_SIZE.md;
    if (isSm) return RESPONSIVE_ELEMENT_SIZE.sm;
    return RESPONSIVE_ELEMENT_SIZE.xs;
  };
  
  const currentElementSize = getCurrentElementSize();
  
  // state 제거하고 실시간 계산
  const currentTheme = THEME_COLORS[theme] || THEME_COLORS.light;
  const pathColor = currentTheme.pathColor;

  // 사람 정보를 담은 리스트
  const humanList = [
    { image: Person1, name: "김도연", job: "블룸 베이커리 사장" },
    { image: Person2, name: "이지은", job: "올데이 카페 바리스타" },
    { image: Person3, name: "박민준", job: "그래픽 디자이너" },
    { image: Person4, name: "정서연", job: "일러스트레이터" },
    { image: Person5, name: "최준호", job: "웹 에이전시 대표" },
    { image: Person6, name: "윤지민", job: "패션 디자이너" },
    { image: Person7, name: "강현우", job: "제품 디자이너" },
    { image: Person8, name: "홍은지", job: "사진작가" },
    { image: Person9, name: "이태석", job: "인테리어 디자이너" },
  ];

  // 마우스 이벤트 핸들러
  const handleMouseEnter = (index) => {
    // console.log(`[SVG 요소 ${index}] 마우스 Enter 이벤트 발생`);
    const person = humanList[index];
    sendTooltipData(`${person.name}, ${person.job}`);
  };

  const handleMouseLeave = () => {
    // console.log(`[SVG 요소] 마우스 Leave 이벤트 발생`);
    clearTooltipData();
  };

  // SVG 이미지 요소 생성
  const createSvgElements = () => {
    return humanList.map((person, index) => (
      <svg
        key={index}
        width={currentElementSize}
        height={currentElementSize}
        viewBox={`0 0 ${currentElementSize} ${currentElementSize}`}
        style={{ 
        filter: theme === 'dark' ? 'invert(1)' : 'none', 
          pointerEvents: "all", 
          cursor: "pointer" 
        }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <image 
          href={person.image} 
          width={currentElementSize} 
          height={currentElementSize}
        />
      </svg>
    ));
  };

  const humanElements = createSvgElements();

  return (
    <Box
      sx={{
        // color: currentTheme.illustColor,
        width: "100%",
        height: "100%",
        position: "relative",
        opacity: 1,
        ...sx
      }}
    >
      <SVGPathCarousel
        elements={humanElements}
        pathType={pathType}
        pathColor={pathColor}
        elementSize={currentElementSize}
      />
    </Box>
  );
}

export default HumanIllustCarousel; 