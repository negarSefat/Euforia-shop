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
      <img style={{ width: '300px' }} src="404.png" alt="error Icon" />

      <h1>Page Not found</h1>
      <p style={{ width: '40%', textAlign: 'center', color: '#807D7E' }}>
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
    </div>
  );
}
