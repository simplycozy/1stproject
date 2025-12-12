import React, { useState, useMemo, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ExampleContainer from "../container/ExampleContainer";
import PropsPanel from "./PropsPanel";
import GridBG from "../background/GridBG";

/**
 * 컴포넌트 플레이그라운드
 *
 * @param {function} Component - 대상 컴포넌트
 * @param {object} recipe - 레시피 데이터 (advancedLearning.propsList 포함)
 * @param {object} initialProps - 초기 props 값
 */
function ComponentPlayground({ Component, recipe, initialProps = {} }) {
	const propsList = useMemo(() => {
		if (recipe?.advancedLearning?.propsList) {
			return recipe.advancedLearning.propsList;
		}
		return [];
	}, [recipe]);

	// 초기 props 설정 (기본값 + 전달된 initialProps)
	const getDefaultProps = () => {
		const defaultProps = {};
		propsList.forEach((prop) => {
			if (prop.default !== undefined) {
				// 문자열인 경우 따옴표 제거 및 적절한 타입으로 변환
				let value = prop.default;
				if (typeof value === 'string') {
					// 배열 형태 문자열 처리 (예: "['a', 'b', 'c']")
					if (value.startsWith('[') && value.endsWith(']')) {
						try {
							value = JSON.parse(value.replace(/'/g, '"'));
						} catch {
							// 파싱 실패 시 원래 값 유지
							console.warn('Failed to parse array string:', value);
						}
					}
				}
				defaultProps[prop.name] = value;
			}
		});
		return { ...defaultProps, ...initialProps };
	};

	const [currentProps, setCurrentProps] = useState(getDefaultProps);
	// 컴포넌트 강제 재렌더링을 위한 key 값
	const [componentKey, setComponentKey] = useState(0);

	// props가 변경될 때마다 컴포넌트를 강제로 재렌더링
	useEffect(() => {
		console.log('🏟️ ComponentPlayground: Props changed, new key:', componentKey + 1, 'props:', currentProps);
		setComponentKey(prevKey => prevKey + 1);
	}, [currentProps]);

	const handleReset = () => {
		console.log('🔄 ComponentPlayground: Reset props');
		setCurrentProps(getDefaultProps());
	};

	const handlePropsChange = (newProps) => {
		console.log('⚙️ ComponentPlayground: Props updating from:', currentProps, 'to:', newProps);
		// 상태 업데이트
		setCurrentProps(newProps);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<ExampleContainer title="인터랙티브 플레이그라운드">
				<GridBG rows={4} cols={10} />
				{Component && <Component key={componentKey} {...currentProps} />}
			</ExampleContainer>
			<Paper
				elevation={0}
				sx={{
					p: 4,
					borderRadius: 6,
					backgroundColor: "transparent",
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<PropsPanel
					propsList={propsList}
					currentProps={currentProps}
					onChange={handlePropsChange}
					onReset={handleReset}
				/>
			</Paper>
		</Box>
	);
}

export default ComponentPlayground;
 