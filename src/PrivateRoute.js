import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/');
        }
      }, [navigate]);
  
    return children;
  };
  

export default PrivateRoute;
