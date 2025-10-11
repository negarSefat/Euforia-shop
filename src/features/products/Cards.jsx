import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularSize from '../loading/Loading';
import BasicCard from './BasicCard';
import Grid from '@mui/material/Grid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMes, setErrorMes] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchApi() {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setCards(response.data);
      } catch (err) {
        setError('Something went wrong');
        setErrorMes(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {loading && <CircularSize />}
      {error && errorMes && (
        <div
          className="error-display"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img style={{ width: '180px' }} src="error3.png" alt="error Icon" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ErrorOutlineIcon
              sx={{
                color: 'rgb(215, 31, 31)',
                height: '30px',
                width: '40px',
              }}
            />
            <h1>{error}</h1>
          </div>
          <h3 style={{ color: 'rgba(187, 34, 34, 1)' }}>{errorMes}</h3>
        </div>
      )}
      {
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop={7}
          marginBottom={15}
          sx={{ marginX: { xs: '32px', sm: '95px', md: '70px' } }}
        >
          {cards.map(
            ({ id, title, description, image, price, rating, category }) => (
              <Grid
                key={id}
                style={{
                  marginBottom: '15px',
                }}
                size={{ xs: 6, sm: 6, md: 3 }}
              >
                <BasicCard
                  title={title}
                  description={description}
                  image={image}
                  price={price}
                  rating={rating}
                  category={category}
                />
              </Grid>
            )
          )}
        </Grid>
      }
    </div>
  );
}
