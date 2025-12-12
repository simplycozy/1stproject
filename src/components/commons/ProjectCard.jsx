import React from "react";
import { Stack, Box, Typography } from "@mui/material";

import PropTypes from "prop-types";


/**
 * ProjectCard 컴포넌트 - 일반적인 링크 사용
 * 
 * Props:
 * @param {string} img - 프로젝트 이미지 URL [Required]
 * @param {string} title - 프로젝트 제목 [Optional, 기본값: "Project Title"]
 * @param {string} exp - 프로젝트 설명 [Optional, 기본값: "branding"]
 * @param {number} projectId - 프로젝트 ID [Required]
 * 
 * Example usage:
 * <ProjectCard 
 *   img="/images/project1.jpg"
 *   title="프로젝트 제목"
 *   exp="브랜딩"
 *   projectId={1}
 * />
 */
const ProjectCard = ({
  img,
  title = "Project Title",
  exp = "branding",
  projectId,
}) => {

  // 튜토리얼용 클릭 핸들러 (비활성화)
  const handleClick = () => {
    console.log(`프로젝트 ${projectId} 클릭됨 - 튜토리얼용으로 비활성화`);
  };

  return (
    <Stack
      gap={1}
      sx={{
        width: "100%",
      }}
    >
      {/* 튜토리얼용 이미지 카드 (클릭만 가능) */}
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "133.33%", // 3:4 비율
          overflow: "hidden",
          borderRadius: "8px",
          mb: 2,
          cursor: "pointer",
          display: "block",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          }
        }}
      >
        <Box 
          component="img"
          src={img}
          alt={title}
          sx={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        
        {/* 호버 시 오버레이 효과 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0)",
            transition: "background 0.3s ease-in-out",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.1)",
            }
          }}
        />
      </Box>
      
      {/* 제목과 설명 */}
      <Typography 
        variant="h5" 
        component="h3"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {exp}
      </Typography>
    </Stack>
  );
};

ProjectCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string,
  exp: PropTypes.string,
  projectId: PropTypes.number.isRequired,
};

export default ProjectCard;
