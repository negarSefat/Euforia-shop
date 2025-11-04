import { Button, Container } from '@mui/material';

export default function Homepage({ onLogin }) {
  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <h2>HomePage </h2>
      <Button variant="contained" onClick={onLogin}>
        Admin Panel
      </Button>
    </Container>
  );
}
