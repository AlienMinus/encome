import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';

const AuthInterceptor = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      (config) => {
        showLoading();
        return config;
      },
      (error) => {
        hideLoading();
        return Promise.reject(error);
      }
    );

    const resInterceptor = axios.interceptors.response.use(
      (response) => {
        hideLoading();
        return response;
      },
      (error) => {
        hideLoading();
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [logout, navigate, showLoading, hideLoading]);

  return null; // This component doesn't render anything
};

export default AuthInterceptor;

