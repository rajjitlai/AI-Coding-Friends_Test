import { Navigate } from 'react-router-dom';
import { authAPI } from '../api';

function PrivateRoute({ children }) {
  return authAPI.isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
