import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularSize from '../loading/Loading';
import BasicCard from './BasicCard';
import Grid from '@mui/material/Grid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
// import api from '../Api/api';
// import { useQuery } from '@tanstack/react-query';

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
          maxWidth={'1280px'}
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            marginX: 'auto',
            padding: { xs: '10px 32px', sm: '20px 95px', md: '20px 70px' },
            justifyContent: { sm: 'start', md: 'center' },
          }}
        >
          {cards.map(
            ({ id, title, description, image, price, rating, category }) => (
              <Grid
                key={id}
                style={{
                  marginBottom: '15px',
                }}
                size={{ xs: 6, sm: 4, md: 3 }}
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

// export default function Cards() {
//   async function queryFn() {
//     return await api.get('products');
//   }

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['products'],
//     queryFn,
//   });
//   // console.log('test':)
//   if (isLoading && <CircularSize />)
//     if (
//       isError &&
//       error && (
//         <div
//           className="error-display"
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <img style={{ width: '180px' }} src="error3.png" alt="error Icon" />
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             <ErrorOutlineIcon
//               sx={{
//                 color: 'rgb(215, 31, 31)',
//                 height: '30px',
//                 width: '40px',
//               }}
//             />
//             <h1>{error}</h1>
//           </div>
//           <h3 style={{ color: 'rgba(187, 34, 34, 1)' }}>{error}</h3>
//         </div>
//       )
//     )
//       return (
//         <Grid
//           maxWidth={'1280px'}
//           container
//           justifyContent="center"
//           alignItems="center"
//           spacing={2}
//           sx={{
//             marginX: 'auto',
//             padding: { xs: '10px 32px', sm: '20px 95px', md: '20px 70px' },
//             justifyContent: { sm: 'start', md: 'center' },
//           }}
//         >
//           {data.map(
//             ({ id, title, description, image, price, rating, category }) => (
//               <Grid
//                 key={id}
//                 style={{
//                   marginBottom: '15px',
//                 }}
//                 size={{ xs: 6, sm: 4, md: 3 }}
//               >
//                 <BasicCard
//                   title={title}
//                   description={description}
//                   image={image}
//                   price={price}
//                   rating={rating}
//                   category={category}
//                 />
//               </Grid>
//             )
//           )}
//         </Grid>
//       );
// }
