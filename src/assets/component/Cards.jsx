import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularSize from './Loading';
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
        setError('Something went wrong!');
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
          marginBottom={5}
          sx={{ marginX: { xs: '32px', sm: '95px', md: '70px' } }}
        >
          {cards.map((cardObject) => (
            <Grid
              key={cardObject.id}
              style={{
                marginBottom: '15px',
              }}
              size={{ xs: 10, sm: 6, md: 3 }}
            >
              <BasicCard
                title={cardObject.title}
                description={cardObject.description}
                image={cardObject.image}
                price={cardObject.price}
                rating={cardObject.rating}
              />
            </Grid>
          ))}
        </Grid>
      }
    </div>
  );
}
