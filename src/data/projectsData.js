// 썸네일 이미지들 import
import bloomBakeryImg from "../assets/thumbnail/bloom-bakery.png";
import sundayTypeImg from "../assets/thumbnail/sunday-type.png";
import airPilatesImg from "../assets/thumbnail/air-pilates.png";
import slowMorningImg from "../assets/thumbnail/slow-morning-tea.png";
import groundedPagesImg from "../assets/thumbnail/grounded-pages.png";
import fieldClayImg from "../assets/thumbnail/field-clay-poterring.png";

// Bloom 프로젝트 이미지들 import
import bloom1 from "../assets/photo/bloom/bloom1.png";
import bloom2 from "../assets/photo/bloom/bloom2.png";
import bloom3 from "../assets/photo/bloom/bloom3.png";
import bloom4 from "../assets/photo/bloom/bloom4.png";
import bloom5 from "../assets/photo/bloom/bloom5.png";
import bloom6 from "../assets/photo/bloom/bloom6.png";
import bloom7 from "../assets/photo/bloom/bloom7.png";
import bloomTop from "../assets/photo/bloom/bloom_top.png";

/**
 * 전역 프로젝트 데이터
 * - 프로젝트 목록과 상세 정보를 포함
 * - ID를 키로 하는 객체 구조로 빠른 조회 가능
 */
export const projectsData = {
  1: {
    id: 1,
    title: "Bloom Bakery",
    exp: "Branding / Package Design",
    img: bloomBakeryImg,
    description: "빵과 제 진짜 삶이 부풀어 오르는 중입니다",
    details: {
      client: "Bloom Bakery",
      year: "2023",
      duration: "3 months",
      services: ["Brand Identity", "Logo Design", "Package Design", "Typography"],
      colors: ["#F4E4BC", "#D4A574", "#8B4513", "#2F1B14"],
      description: "Bloom Bakery는 지역 커뮤니티에 사랑받는 수제 베이커리입니다. 매일 아침 갓 구운 빵의 향기와 따뜻한 분위기를 브랜드에 담고자 했습니다."
    },
    imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
  },
  2: {
    id: 2,
    title: "Sunday Type",
    exp: "Typography / Book Design",
    img: sundayTypeImg,
    description: "일요일의 여유로운 감성을 담은 타이포그래피 프로젝트. 세리프와 산세리프의 조화로 모던하면서도 클래식한 매력을 표현했습니다.",
    details: {
      client: "Sunday Publishing",
      year: "2023",
      duration: "4 months",
      services: ["Typography Design", "Book Layout", "Editorial Design", "Custom Font"],
      colors: ["#1A1A1A", "#F5F5F5", "#E8E8E8", "#666666"],
      description: "여유로운 일요일 오후의 독서 경험을 위한 타이포그래피 시스템입니다. 가독성과 미적 아름다움의 균형을 추구했습니다."
    },
    imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
  },
  3: {
    id: 3,
    title: "Air Pilates",
    exp: "Brand Identity / Web Design",
    img: airPilatesImg,
    description: "현대적이고 미니멀한 필라테스 스튜디오 브랜딩. 공중 필라테스의 유연함과 자유로움을 시각적으로 표현했습니다.",
    details: {
      client: "Air Pilates Studio",
      year: "2023",
      duration: "5 months",
      services: ["Brand Identity", "Web Design", "App Design", "Marketing Materials"],
      colors: ["#E8F4F8", "#B8E0D2", "#95C9DC", "#4A90A4"],
      description: "몸과 마음의 균형을 찾는 공간으로서의 필라테스 스튜디오. 공기의 가벼움과 움직임의 흐름을 디자인에 반영했습니다."
    },
    imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
  },
  4: {
    id: 4,
    title: "Slow Morning Tea",
    exp: "Package Design / Brand Strategy",
    img: slowMorningImg,
    description: "느린 아침을 위한 프리미엄 티 브랜드. 자연스러운 소재와 차분한 색감으로 평온한 차 한 잔의 순간을 표현했습니다.",
    details: {
      client: "Slow Morning Co.",
      year: "2022",
      duration: "6 months",
      services: ["Package Design", "Brand Strategy", "Photography Direction", "Product Naming"],
      colors: ["#F7F3E9", "#DDB892", "#A08963", "#5D4E37"],
      description: "바쁜 일상 속에서 잠시 멈춰 서는 시간의 소중함. 느린 아침 차 한 잔으로 시작하는 하루의 여유로움을 브랜드에 담았습니다."
    },
    imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
  },
  5: {
    id: 5,
    title: "Grounded Pages",
    exp: "Editorial Design / Branding",
    img: groundedPagesImg,
    description: "독립 출판사를 위한 차분하고 안정감 있는 브랜드 아이덴티티. 글과 종이의 물성을 살린 촉각적 디자인 접근법을 사용했습니다.",
    details: {
      client: "Grounded Publishing",
      year: "2022",
      duration: "4 months",
      services: ["Editorial Design", "Brand Identity", "Book Cover Design", "Layout System"],
      colors: ["#F8F6F0", "#D4C4A8", "#8B7355", "#3E352A"],
      description: "책의 무게감과 깊이 있는 내용을 시각적으로 전달하는 출판사 브랜딩. 읽는 즐거움을 디자인으로 표현했습니다.",
      imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
    }
  },
  6: {
    id: 6,
    title: "Field Clay Pottering",
    exp: "Product Design / Visual Identity",
    img: fieldClayImg,
    description: "수공예 도자기 공방의 자연스럽고 진정성 있는 브랜드 아이덴티티. 흙과 불이 만나 만들어지는 도자기의 과정을 시각화했습니다.",
    details: {
      client: "Field Clay Studio",
      year: "2022",
      duration: "5 months",
      services: ["Visual Identity", "Product Photography", "Workshop Materials", "Website Design"],
      colors: ["#E8DDD4", "#C4A484", "#8B6F47", "#4A3428"],
      description: "흙을 빚어 만드는 도자기처럼, 손으로 만든 것의 가치와 아름다움을 브랜드에 담았습니다. 자연 소재의 따뜻함을 시각적으로 표현했습니다.",
      imageList: [bloomTop, bloom1, bloom2, bloom3, bloom4, bloom5, bloom6, bloom7]
    }
  }
};

/**
 * 프로젝트 목록을 배열로 반환하는 함수
 * @returns {Array} 프로젝트 객체들의 배열
 */
export const getProjectsList = () => {
  return Object.values(projectsData);
};

/**
 * ID로 특정 프로젝트를 조회하는 함수
 * @param {number|string} id - 프로젝트 ID
 * @returns {object|null} 프로젝트 객체 또는 null
 */
export const getProjectById = (id) => {
  const projectId = parseInt(id);
  return projectsData[projectId] || null;
};

/**
 * 다음/이전 프로젝트 ID를 반환하는 함수
 * @param {number|string} currentId - 현재 프로젝트 ID
 * @returns {object} next, prev ID를 포함한 객체
 */
export const getAdjacentProjects = (currentId) => {
  const projectIds = Object.keys(projectsData).map(id => parseInt(id)).sort((a, b) => a - b);
  const currentIndex = projectIds.findIndex(id => id === parseInt(currentId));
  
  return {
    prev: currentIndex > 0 ? projectIds[currentIndex - 1] : null,
    next: currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null
  };
}; 