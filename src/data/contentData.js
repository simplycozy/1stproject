/**
 * 랜딩 페이지 콘텐츠 데이터
 * 모든 섹션에서 사용되는 텍스트를 중앙 관리
 */

// 이미지 import
import ordinaryPeopleImg from '../assets/illust/ordinary_people.png';
import storyImg from '../assets/photo/story.png';

// HeroSection 콘텐츠
export const heroContent = {
  mainText: "Design For\nOrdinary People",
  typingSpeed: 60,
  deleteSpeed: 30,
  startDelay: 300,
  cursorType: "line"
};

// TransitionSection 콘텐츠
export const transitionContent = {
  text: "ORDINARY",
  imagePath: ordinaryPeopleImg
};

// MissionSection 콘텐츠
export const missionContent = {
  title: "Ordinary Mission",
  description: {
    brandName: "Ordinary Design",
    message: [
      "은 평범한 사람들의 꿈을 고민합니다.",
      "거창한 시작이 없이 가장 나다운 브랜드를",
      "만들 수 있다고 믿습니다."
    ]
  }
};

// StorySection 콘텐츠
export const storyContent = {
  author: {
    name: "김도연",
    company: "베이커리 Bloom",
    position: "대표"
  },
  mainMessage: [
    "반죽과 제 진짜 삶이",
    "부풀어 오르는 중입니다."
  ],
  quote: "손으로 반죽하고, 굽고, 나누는 일.\n이제는 그게 제 직업, 브랜드가 되었어요",
  imagePath: storyImg
};

// ProjectsSection 콘텐츠
export const projectsContent = {
  title: "Ordinary Projects",
  // 실제 프로젝트 데이터는 projectsData.js에서 관리
  description: "평범한 사람들을 위한 디자인 프로젝트"
};

// ContactSection 콘텐츠
export const contactContent = {
  title: [
    "Let's Work",
    "Together"
  ],
  subtitle: [
    "평범한 사람들을 위한 디자인,",
    "함께 만들어 나가요."
  ],
  contact: {
    email: {
      label: "Email",
      value: "hello@ordinary.design"
    },
    phone: {
      label: "Phone", 
      value: "+82 10 1234 5678"
    }
  }
};

// 전체 사이트 메타 데이터
export const siteMetadata = {
  brandName: "Ordinary Design",
  brandTagline: "평범한 사람들을 위한 디자인",
  navigation: {
    home: "Home",
    projects: "Projects", 
    contact: "Contact",
    story: "Story"
  }
};

 