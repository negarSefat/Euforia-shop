import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  return (
    <div
      className="error-display"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '70px',
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
        <h1>Page Not found!</h1>
      </div>
    </div>
  );
}
