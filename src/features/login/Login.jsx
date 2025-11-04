import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const validUser = data.username === 'negar' && data.password === '7777';

    if (validUser) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, height: 'auto' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 2,
          marginBottom: 10,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Admin Login
        </Typography>

        <TextField
          label="Username"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
}
