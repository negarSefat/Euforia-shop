import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  autocompleteClasses,
  Box,
  Button,
  Divider,
  Fade,
  Rating,
  Tooltip,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../Api/api';
import CircularSize from '../loading/Loading';
import { Block } from '@mui/icons-material';
import { useState } from 'react';

export default function ActionAreaCard() {
  const [number, setNumber] = useState(0);
  const { id } = useParams();
  // console.log('id', id);
  async function queryFn() {
    try {
      return await api.get(`products/${id}`);
    } catch (err) {
      return err;
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: [`single-product-${id}`],
    queryFn,
  });

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

  if (isLoading) return <CircularSize />;
  return (
    <Card
      sx={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: { xs: 3, md: 4 },
        paddingX: { xs: 5, md: 15 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardMedia
          component="img"
          image={data.image}
          alt={data.title}
          sx={{
            borderRadius: '10px',
            objectFit: 'contain',
            backgroundColor: '#F6F6F6',
            padding: 8,
            height: { xs: '40vh', md: '90vh' },
          }}
        />
        <CardContent
          sx={{
            paddingLeft: { xs: 2, md: 5 },
            fontFamily: 'causten',
            marginLeft: { xs: 2, md: 5 },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'sansc',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: 'rgba(35, 55, 142, 1)',
              fontSize: { xs: '18px', md: '24px' },
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '10px',
              marginBottom: '30px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          ></Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '10px',
              marginBottom: '30px',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              // display: Block,
              // width: '60%',
              // padding:'50px'
            }}
          >
            Description: {data.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              marginBottom: '20px',
            }}
          >
            <Box
              sx={{
                border: '1px solid #615f5fff',
                borderRadius: '8px',
                padding: '5px',
              }}
            >
              {data.price}$
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Rating
                sx={{ fontSize: '20px' }}
                name="read-only"
                value={data.rating.rate}
                readOnly
              />
              <span style={{ fontSize: '12px', color: 'gray' }}>
                {data.rating.rate}
              </span>
            </Box>
          </Box>
          <Divider></Divider>
          <Box>
            <FormControl sx={{ marginTop: '15px' }}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ fontSize: '10px', marginBottom: '10px' }}
              >
                Choose a size
              </FormLabel>
              <RadioGroup
                sx={{
                  backgroundColor: '#f0f0f5ff',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  sx={{
                    marginLeft: '1px',
                  }}
                  value="Small"
                  control={
                    <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />
                  }
                  label="Small"
                />
                <FormControlLabel
                  sx={{
                    marginLeft: '1px',
                  }}
                  value="Medium"
                  control={
                    <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />
                  }
                  label="Medium"
                />
                <FormControlLabel
                  sx={{
                    marginLeft: '1px',
                  }}
                  value="Large"
                  control={
                    <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />
                  }
                  label="Large"
                />
                <FormControlLabel
                  sx={{
                    marginLeft: '1px',
                  }}
                  value="Extra large"
                  control={
                    <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />
                  }
                  label="Extra large"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider></Divider>
          <Box
            sx={{
              marginTop: '10px',
              fontSize: '12px',
              color: 'rgba(113, 113, 116, 1)',
            }}
          >
            <span>Colors</span>
            <Box sx={{ display: 'flex' }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
              fontSize: '12px',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#f0f0f5ff',
                borderRadius: '30px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <button onClick={decrease} style={{ cursor: 'pointer' }}>
                -
              </button>
              <span>{number}</span>
              <button onClick={increase} style={{ cursor: 'pointer' }}>
                +
              </button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#0d143bff',
                color: 'white',
                padding: { xs: '2px 40px', md: '8px 60px' },
                borderRadius: '30px',
                cursor: 'pointer',
              }}
            >
              <ShoppingCartIcon sx={{ width: '15px' }} />
              <span>Add to cart</span>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
