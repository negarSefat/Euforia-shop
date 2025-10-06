import Typography from '@mui/material/Typography';

export default function AboutUs() {
  return (
    <>
      <p
        style={{
          textAlign: 'center',
          marginTop: '30px',
          marginBottom: '40px',
          fontFamily: 'poppins',
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
          gap: '50px',
          marginBottom: '40px',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: '20px',
        }}
      >
        <div>
          <img
            src="/store.webp"
            alt="store image"
            style={{ width: '350px', borderRadius: '70px ' }}
          />
        </div>
        <Typography
          component="div"
          sx={{ width: { xs: '60%', sm: '40%' }, fontFamily: 'poppins' }}
        >
          <span>Our Vintage Journey</span>
          <p style={{ fontSize: '12px', color: '#211e5bff' }}>
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
