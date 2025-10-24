import * as React from 'react';
import { useState } from 'react';
import '@fontsource/poppins';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../cart/useCart';

export default function ImgMediaCard({ id, title, image, rating, price }) {
  console.log(id);
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);

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
        margin: '1px',
        overflowX: 'visible',
      }}
    >
      <CardMedia
        onClick={() => navigate(`/products/${id}`)} //dynamic route
        style={{
          objectFit: 'contain',
          padding: '4px',
          marginTop: 10,
          backgroundColor: '#F6F6F6',
          width: '80%',
          marginInline: 'auto',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
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
          backgroundColor: '#807D7E',
          padding: 5,
          fontSize: 30,
          borderBottomLeftRadius: 5,
        }}
      />
      <CardContent sx={{ padding: '10px', fontFamily: 'causten' }}>
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
          variant="h5"
          component="div"
          fontFamily={'causten'}
          fontSize={12}
          textAlign={'center'}
          lineHeight={1.5}
          minHeight={40}
          marginTop={'10px'}
          color="#111880ff"
        >
          {title}
        </Typography>
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
            fontFamily: 'causten',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              fontFamily: 'causten',
            }}
          >
            <StarIcon sx={{ color: '#e8d121ff', fontSize: '18px' }} />
            <span>{rating.rate}</span>
            <span style={{ color: 'gray' }}>({rating.count})</span>
          </div>
          <div
            style={{
              backgroundColor: '#e7e5e5ff',
              padding: '4px',
              borderRadius: '5px',
            }}
          >
            ${price}
          </div>
        </div>
      </CardActions>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 5px',
        }}
      >
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Button
            onClick={increase}
            sx={{
              padding: '10px 0',
              color: 'black',
              lineHeight: '0.5',
              minWidth: '25px',
              border: ' 1px solid rgba(26, 31, 104, 0.3)',
              display: { xs: 'none', md: 'block' },
            }}
          >
            +
          </Button>
          <Typography
            sx={{ display: { xs: 'none', md: 'block' }, padding: '5px' }}
          >
            {number}
          </Typography>
          <Button
            onClick={decrease}
            sx={{
              padding: '10px 0',
              color: 'black',
              lineHeight: '0.5',
              minWidth: '25px',
              border: ' 1px solid rgba(26, 31, 104, 0.3)',
              width: { xs: '5px' },
              display: { xs: 'none', md: 'block' },
            }}
          >
            -
          </Button>
        </div> */}
        <Button
          variant="contained"
          sx={{
            // width: { xs: '100%', md: '60%' },
            width: '100%',
            fontSize: { xs: '9px', sm: '10px' },
            fontFamily: 'causten',
            padding: '5px 15px',
            margin: '5px 2px',
          }}
          startIcon={
            <ShoppingCartIcon sx={{ width: { xs: '10px', sm: '14px' } }} />
          }
        >
          <span onClick={() => addToCart({ id, title, image, price })}>
            Add to cart
          </span>
        </Button>
      </div>
    </Card>
  );
}
