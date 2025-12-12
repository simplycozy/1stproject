import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

/**
 * 라이트/다크 테마 모드에 따라 배경색이 전환되는 컴포넌트
 * @param {object} props
 * @param {'light' | 'dark'} props.themeMode - 현재 적용할 테마 모드
 */
const DynamicBackground = ({ themeMode = "light" }) => {
	// 테마 모드에 따른 배경색 결정
	const backgroundColor =
		themeMode === "light"
			? "#fafafa" // 라이트 모드 배경색 (예: #ffffff)
			: "#020202"; // 다크 모드 배경색 (예: #212121 또는 더 어둡게)

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 0, // 다른 모든 콘텐츠 뒤에 위치하도록 설정
				backgroundColor: backgroundColor, // 계산된 배경색 적용
				transition: "background-color 0.7s ease-in-out", // 배경색 전환 효과
				pointerEvents: "none", // 배경이 이벤트를 가로채지 않도록 함
			}}
		/>
	);
};

DynamicBackground.propTypes = {
	themeMode: PropTypes.oneOf(["light", "dark"]).isRequired,
};

export default DynamicBackground;
