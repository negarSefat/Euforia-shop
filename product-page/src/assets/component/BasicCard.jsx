import * as React from 'react';
import { useState } from 'react';
import '@fontsource/poppins';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ImgMediaCard({
  title,
  description,
  image,
  rating,
  price,
}) {
  // console.log(cardObject);
  const [number, setNumber] = useState(0);
  function decrease() {
    return setNumber((prev) => {
      return prev > 0 ? prev - 1 : 0;
    });
  }
  function increase() {
    return setNumber((prev) => {
      return prev + 1;
    });
  }
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
      }}
    >
      <CardMedia
        style={{ objectFit: 'contain', marginTop: 10 }}
        component="img"
        alt={title}
        height="120"
        image={image}
      />
      <FavoriteBorderIcon
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'white',
          backgroundColor: '#353753',
          padding: 5,
          fontSize: 20,
          borderBottomLeftRadius: 5,
          cursor: 'pointer',
        }}
      />
      <CardContent sx={{ padding: '10px' }}>
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
          variant="h5"
          component="div"
          fontFamily={'poppins'}
          fontSize={14}
          textAlign={'center'}
          lineHeight={1.5}
          minHeight={60}
          marginTop={'10px'}
          color="#111880ff"
        >
          {title}
        </Typography>

        <Tooltip
          title={description}
          slots={{
            transition: Fade,
          }}
          slotProps={{
            transition: { timeout: 600 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: 10,
              cursor: 'pointer',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            More detail: {description}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingInline: '4px',
            paddingBottom: '5px',
            fontSize: '13px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <StarIcon sx={{ color: '#e8d121ff', fontSize: '18px' }} />
            <span>{rating.rate}</span>
            <span style={{ color: 'gray' }}>({rating.count})</span>
          </div>
          <div>${price}</div>
        </div>
      </CardActions>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={increase}
            sx={{
              padding: '10px',
              margin: '4px',
              color: 'black',
              lineHeight: '0.5',
              minWidth: '25px',
              border: ' 1px solid rgba(26, 31, 104, 0.3)',
              width: { xs: '5px' },
            }}
          >
            +
          </Button>
          <span style={{ padding: '4px' }}>{number}</span>
          <Button
            onClick={decrease}
            sx={{
              padding: '10px',
              margin: '4px',
              color: 'black',
              lineHeight: '0.5',
              minWidth: '25px',
              border: ' 1px solid rgba(26, 31, 104, 0.3)',
              width: { xs: '5px' },
            }}
          >
            -
          </Button>
        </div>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#353753',
            fontSize: '10px',
            minWidth: '60%',
            padding: { xs: '5px 4px', sm: '5px 10px', md: '6px 8px' },
          }}
          startIcon={
            <ShoppingCartIcon sx={{ width: { sm: '14px', xs: '10px' } }} />
          }
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
