// src/features/about-us/router/protected-route.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const auth = localStorage.getItem('isAuthenticated') === 'true';
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
