import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

function LoginPage() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      setShowSuccessMessage(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard', { state: { successMessage: 'Login successful' } });
    }
  });

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}>
      {showSuccessMessage && <div style={{ position: 'absolute', top: 10, right: 10, color: 'black' }}>{location.state.successMessage}</div>}
      <button
        onClick={() => login()}
        style={{
          background: 'yellow',
          color: 'black',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
