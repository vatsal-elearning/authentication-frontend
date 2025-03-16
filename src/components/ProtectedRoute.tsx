import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProfile } from '../redux/authSlice';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
