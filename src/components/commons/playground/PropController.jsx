import React from "react";
import { Stack, Switch, TextField, Typography, Tooltip, Select, MenuItem, FormControl, IconButton, Box } from "@mui/material";
import { MuiColorInput } from "mui-color-input"; // 색상 선택기를 위한 라이브러리 사용
import { Add, Remove } from "@mui/icons-material";

/**
 * 타입별 props 컨트롤러
 * 
 * @param {object} propInfo - prop 정보 (name, type, description, required, default, options)
 * @param {any} value - 현재 값
 * @param {function} onChange - 값 변경 핸들러
 */
function PropController({ propInfo, value, onChange }) {
  const { name, type, description, default: defaultValue, options } = propInfo;
  
  // 타입에 따른 컨트롤러 렌더링
  const renderController = () => {
    switch (type) {
      case "string":
        // 이름에 'color'가 포함되어 있고, 명시적으로 type이 'color'가 아닌 경우에만 기존 추론 방식 사용
        if (name.toLowerCase().includes("color")) {
          return (
            <MuiColorInput
              value={value || ""}
              onChange={(newValue) => onChange(name, newValue)}
              format="hex"
              fullWidth
              size="medium"
            />
          );
        }
        return (
          <TextField
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
            fullWidth
            size="medium"
          />
        );
      
      case "color": // 명시적으로 type이 color인 경우
        return (
          <MuiColorInput
            value={value || defaultValue || ""} // 기본값도 고려
            onChange={(newValue) => onChange(name, newValue)}
            format="hex"
            fullWidth
            size="medium"
          />
        );

      case "color[]": { // 색상 배열 타입
        const colorArray = Array.isArray(value) ? value : (defaultValue || ["#ff0000", "#0000ff"]);
        console.log('🎨 PropController color[]: Current array:', colorArray);
        
        return (
          <Stack spacing={1}>
            {colorArray.map((color, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MuiColorInput
                  value={color}
                  onChange={(newColor) => {
                    const newArray = [...colorArray];
                    newArray[index] = newColor;
                    console.log('🎨 PropController color[] changed at index', index, ':', newColor, 'new array:', newArray);
                    onChange(name, newArray);
                  }}
                  format="hex"
                  size="medium"
                  sx={{ flex: 1 }}
                />
                {colorArray.length > 2 && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      const newArray = colorArray.filter((_, i) => i !== index);
                      console.log('➖ PropController color[] remove at index', index, 'new array:', newArray);
                      onChange(name, newArray);
                    }}
                  >
                    <Remove />
                  </IconButton>
                )}
              </Box>
            ))}
            {colorArray.length < 5 && (
              <IconButton
                size="small"
                onClick={() => {
                  const newArray = [...colorArray, "#ffffff"];
                  console.log('➕ PropController color[] add, new array:', newArray);
                  onChange(name, newArray);
                }}
                sx={{ alignSelf: 'flex-start' }}
              >
                <Add />
              </IconButton>
            )}
          </Stack>
        );
      }

      case "number":
        return (
          <TextField
            type="number"
            value={value ?? defaultValue ?? 0}
            onChange={(e) => {
              const newValue = e.target.value === "" ? "" : Number(e.target.value);
              onChange(name, newValue);
            }}
            fullWidth
            size="medium"
            InputProps={{
              inputProps: {
                min: 0,
                max: name.includes("delay") || name.includes("duration") ? 2000 : 100
              }
            }}
          />
        );
      
      case "boolean":
        return (
          <Switch
            checked={value || false}
            onChange={(e) => onChange(name, e.target.checked)}
            size="medium"
          />
        );
      
      case "string[]":
        return (
          <TextField
            value={Array.isArray(value) ? value.join(", ") : ""}
            onChange={(e) => {
              // 쉼표로 구분하되 띄어쓰기 여부는 무시하고 배열로 변환
              const newValue = e.target.value.split(/\s*,\s*/);
              onChange(name, newValue);
            }}
            fullWidth
            size="medium"
            placeholder="쉼표로 구분"
          />
        );
      
      case "enum":
        return (
          <FormControl fullWidth size="medium">
            <Select
              value={value || defaultValue}
              onChange={(e) => onChange(name, e.target.value)}
              displayEmpty
            >
              {options && options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      default:
        return <Typography color="text.secondary" variant="caption">지원되지 않는 타입: {type}</Typography>;
    }
  };

  return (
    <Stack spacing={1.5} sx={{ mb: 1.5 }}>
      <div>
        <Tooltip title={description} placement="top" arrow>
          <Typography variant="body2" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
            {name.split(/(?=[A-Z])/).join(" ").toUpperCase()}
          </Typography>
        </Tooltip>
        {description && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {description}
          </Typography>
        )}
      </div>
      {renderController()}
    </Stack>
  );
}

export default PropController; 