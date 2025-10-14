import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Rating } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: '1280px', padding: 8 }}>
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          height="400px"
          // Width="100px"
          image="/kadin.png"
          alt="green iguana"
          sx={{ borderRadius: '10px' }}
        />
        <CardContent sx={{ padding: 3, paddingLeft: 5, fontFamily: 'causten' }}>
          {/* <Typography
            sx={{
              fontFamily: 'sansc',
              fontSize: '12px',
              marginBottom: '15px',
              backgroundColor: '#4989caff',
              color: 'white',
              padding: '5px',
              display: 'inline-block',
              borderRadius: '8px',
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Woman's cloth
          </Typography> */}
          <Typography
            sx={{
              fontFamily: 'sansc',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: 'rgba(35, 55, 142, 1)',
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Raven Hoodie
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '12px',
              marginBottom: '30px',
            }}
          >
            Desc: Lizards are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
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
                padding: '3px',
              }}
            >
              200$
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Rating
                sx={{ fontSize: '20px' }}
                name="read-only"
                value={4}
                readOnly
              />
              <span style={{ fontSize: '12px', color: 'gray' }}>3.5</span>
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
              // padding: '5px',
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
              <button>-</button>
              <span>5</span>
              <button>+</button>
            </Box>
            <Box
              sx={{
                // Width: '500px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#0d143bff',
                color: 'white',
                padding: '8px 80px',
                borderRadius: '30px',
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
