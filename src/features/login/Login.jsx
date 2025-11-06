import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import Navbar from '../../assets/component/Navbar';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const validUser = data.username === 'negar' && data.password === '7777';

      if (validUser) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        setErrorMsg('Invalid username or password!');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ fontFamily: 'causten' }}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(../../../public/store.png)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(196, 194, 194, 0.83)',
            zIndex: 0,
          }}
        />
        <Container
          maxWidth="sm"
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: 5 }}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
              sx={{ marginTop: 3, fontFamily: 'causten' }}
            >
              Login Page
            </Typography>
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            </Box>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 3,
              }}
            >
              <Box>
                <img
                  style={{ width: '250px', height: '200px' }}
                  src="../../../public/clothhanger.png"
                  alt="cloth hange icon"
                />
              </Box>
              <Box sx={{ paddingRight: 1 }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  {/* Username  */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Username
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      {...register('username', {
                        required: 'Username is required',
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  </Box>

                  {/* Password Field */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Password
                    </Typography>
                    <TextField
                      sx={{ overflowY: 'hidden' }}
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      variant="outlined"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleShowPassword}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 1,
                      py: 1.2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      transition: '0.3s',
                      '&:hover': { backgroundColor: '#1565c0' },
                      fontFamily: 'causten',
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
}
