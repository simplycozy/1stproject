import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Rating } from '@mui/material';

/**
 * SimpleItemCard 컴포넌트
 * 간단한 아이템 정보를 표시하는 카드 컴포넌트
 * 
 * Props:
 * @param {string} title - 아이템 제목 [Required]
 * @param {number} price - 아이템 가격 [Required]
 * @param {number} rating - 아이템 평점 (0-5) [Required]
 * @param {string} category - 아이템 카테고리 [Required]
 * @param {string} description - 아이템 설명 [Optional]
 * @param {string} color - 카드 테마 색상 [Optional, 기본값: 'primary']
 * 
 * Example usage:
 * <SimpleItemCard 
 *   title="제품명" 
 *   price={29000} 
 *   rating={4.5} 
 *   category="전자제품"
 *   description="간단한 설명"
 * />
 */
function SimpleItemCard({ 
  title, 
  price, 
  rating, 
  category, 
  description = '', 
  color = 'primary' 
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
            {title}
          </Typography>
          <Chip 
            label={category} 
            size="small" 
            color={color}
            sx={{ ml: 1 }}
          />
        </Box>
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {description}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            {formatPrice(price)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({rating})
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SimpleItemCard; 