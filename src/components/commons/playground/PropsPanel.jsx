import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropController from "./PropController";

/**
 * Props 컨트롤 패널
 * 
 * @param {Array} propsList - 컴포넌트 props 목록
 * @param {object} currentProps - 현재 적용된 props 값
 * @param {function} onChange - prop 값 변경 핸들러
 */
function PropsPanel({ propsList, currentProps, onChange }) {
  // 내부 상태로 props를 관리하여 즉시 업데이트 가능하게 함
  const [internalProps, setInternalProps] = useState(currentProps);
  
  // currentProps가 외부에서 변경되면 내부 상태 동기화
  useEffect(() => {
    console.log('📋 PropsPanel: External props changed, syncing internal state:', currentProps);
    setInternalProps(currentProps);
  }, [currentProps]);

  const handlePropChange = (name, value) => {
    console.log('🎛️ PropsPanel: Prop change:', name, 'value:', value);
    
    // 내부 상태 업데이트
    const newProps = {
      ...currentProps,
      [name]: value
    };
    
    console.log('📤 PropsPanel: Sending updated props to parent:', newProps);
    
    // 내부 상태 업데이트
    setInternalProps(newProps);
    
    // 외부 onChange 직접 호출
    onChange(newProps);
  };

  // required가 true인 props만 필터링
  const requiredPropsList = propsList.filter(prop => prop.required === true);

  // string[] 타입의 값이 없는 경우 빈 문자열 하나를 가진 배열로 초기값 설정
  const getDefaultValue = (prop, value) => {
    if (prop.type === "string[]" && (!value || (Array.isArray(value) && value.length === 0))) {
      return [""];
    }
    return value;
  };

  return (
    <Box>    
      <Grid container spacing={2}>
        {requiredPropsList.map((prop) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={prop.name}>
            <PropController
              propInfo={prop}
              value={getDefaultValue(prop, internalProps[prop.name])}
              onChange={handlePropChange}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PropsPanel; 