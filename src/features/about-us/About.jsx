import Typography from '@mui/material/Typography';

export default function AboutUs() {
  return (
    <>
      <p
        style={{
          textAlign: 'center',
          marginTop: '40px',
          marginBottom: '30px',
          fontFamily: 'causten',
          fontSize: '24px',
        }}
      >
        About us
      </p>
      <Typography
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '70px',
          marginBottom: '40px',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: '10px',
        }}
      >
        <div>
          <img
            src="/store.png"
            alt="store image"
            style={{ width: '300px', borderRadius: '15px ' }}
          />
        </div>
        <Typography
          component="div"
          sx={{ width: { xs: '60%', sm: '40%' }, fontFamily: 'causten' }}
        >
          <span style={{ color: '#4d77c9ff', fontWeight: 'bold' }}>
            Our Vintage Journey
          </span>
          <p
            style={{
              fontSize: '12px',
              color: '#7d7b97ff',
            }}
          >
            Germiston Vintage Clothing, founded by Nomalanga Ndebele, celebrates
            the beauty of vintage fashion. Our journey started from a personal
            passion, evolving into a thriving business that supports local
            talent. Join us in preserving history and style.
          </p>
        </Typography>
      </Typography>
    </>
  );
}
