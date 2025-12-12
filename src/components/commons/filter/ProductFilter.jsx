import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';

/**
 * ProductFilter 컴포넌트
 * 제품 정렬 및 필터링을 위한 UI
 * 
 * Props:
 * @param {string} sortField - 현재 정렬 기준 [Required]
 * @param {function} onSortFieldChange - 정렬 기준 변경 핸들러 [Required]
 * @param {string} sortDirection - 현재 정렬 방향 [Required]
 * @param {function} onSortDirectionChange - 정렬 방향 변경 핸들러 [Required]
 * @param {string} searchQuery - 현재 검색어 [Required]
 * @param {function} onSearchChange - 검색어 변경 핸들러 [Required]
 * @param {array} selectedCategories - 선택된 카테고리 목록 [Required]
 * @param {function} onCategoryToggle - 카테고리 토글 핸들러 [Required]
 * @param {object} categories - 카테고리 정보 객체 [Required]
 * 
 * Example usage:
 * <ProductFilter
 *   sortField={sortField}
 *   onSortFieldChange={setSortField}
 *   sortDirection={sortDirection}
 *   onSortDirectionChange={setSortDirection}
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   selectedCategories={selectedCategories}
 *   onCategoryToggle={toggleCategory}
 *   categories={categories}
 * />
 */
function ProductFilter({
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  categories,
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // 공통 입력 스타일
  const techInputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: isDarkMode
        ? alpha(theme.palette.background.paper, 0.7)
        : alpha(theme.palette.background.paper, 0.6),
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 183, 255, 0.3)",
      "&:hover": {
        borderColor: "rgba(0, 183, 255, 0.5)",
      },
      "&.Mui-focused": {
        borderColor: "rgba(0, 183, 255, 0.6)",
        boxShadow: "0 0 0 2px rgba(0, 183, 255, 0.1)",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* 첫 번째 라인: 정렬과 검색 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          flexWrap: "wrap",
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        {/* 정렬 옵션 */}
        <FormControl
          size="small"
          sx={{ minWidth: 120, ...techInputStyle }}
        >
          <InputLabel id="sort-field-label">정렬 기준</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            label="정렬 기준"
            onChange={(e) => onSortFieldChange(e.target.value)}
          >
            <MenuItem value="name">이름</MenuItem>
            <MenuItem value="price">가격</MenuItem>
            <MenuItem value="rating">평점</MenuItem>
          </Select>
        </FormControl>

        {/* 정렬 방향 */}
        <ToggleButtonGroup
          value={sortDirection}
          exclusive
          size="small"
          onChange={(e, newValue) => {
            if (newValue !== null) {
              onSortDirectionChange(newValue);
            }
          }}
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              border: "1px solid rgba(0, 183, 255, 0.2)",
              color: isDarkMode
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
              backgroundColor: isDarkMode
                ? alpha(theme.palette.background.paper, 0.7)
                : alpha(theme.palette.background.paper, 0.6),
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 183, 255, 0.1)",
                color: isDarkMode
                  ? "rgba(0, 183, 255, 0.9)"
                  : "rgba(0, 115, 171, 0.9)",
                borderColor: "rgba(0, 183, 255, 0.4)",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 183, 255, 0.05)",
              },
            },
          }}
        >
          <ToggleButton value="asc">오름차순</ToggleButton>
          <ToggleButton value="desc">내림차순</ToggleButton>
        </ToggleButtonGroup>

        {/* 검색 필드 */}
        <TextField
          size="small"
          label="제품명 검색"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flexGrow: 1, ...techInputStyle }}
        />
      </Box>

      {/* 두 번째 라인: 카테고리 필터 */}
      <Box
        sx={{
          p: 2,
          borderRadius: "8px",
          backgroundColor: isDarkMode
            ? alpha(theme.palette.background.paper, 0.4)
            : alpha(theme.palette.background.paper, 0.3),
          border: "1px solid rgba(0, 183, 255, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mr: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            카테고리:
          </Typography>

          {/* 전체 선택 Chip */}
          <Chip
            label="전체"
            size="small"
            clickable
            onClick={() => onCategoryToggle("all")}
            variant={
              selectedCategories.includes("all") ? "filled" : "outlined"
            }
            sx={{
              borderColor: "rgba(0, 183, 255, 0.3)",
              backgroundColor: selectedCategories.includes("all")
                ? "rgba(0, 183, 255, 0.1)"
                : "transparent",
              color: selectedCategories.includes("all")
                ? isDarkMode
                  ? "rgba(0, 183, 255, 0.9)"
                  : "rgba(0, 115, 171, 0.9)"
                : isDarkMode
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(0, 183, 255, 0.15)",
              },
            }}
          />

          {/* 카테고리별 Chip */}
          {Object.values(categories).map((category) => {
            const isSelected = selectedCategories.includes(category.id);

            return (
              <Chip
                key={category.id}
                label={`${category.icon} ${category.title}`}
                size="small"
                clickable
                onClick={() => onCategoryToggle(category.id)}
                variant={isSelected ? "filled" : "outlined"}
                sx={{
                  borderColor: "rgba(0, 183, 255, 0.3)",
                  backgroundColor: isSelected
                    ? "rgba(0, 183, 255, 0.1)"
                    : "transparent",
                  color: isSelected
                    ? isDarkMode
                      ? "rgba(0, 183, 255, 0.9)"
                      : "rgba(0, 115, 171, 0.9)"
                    : isDarkMode
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 183, 255, 0.15)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductFilter; 