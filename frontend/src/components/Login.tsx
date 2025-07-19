import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import jinImage from '../jin.jpeg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(async () => {
      if (email === 'test@example.com' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Record visit
        try {
          await fetch('http://localhost:8080/api/visitors/record', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userEmail=${encodeURIComponent(email)}`,
          });
        } catch (error) {
          console.error('Failed to record visit:', error);
        }
        
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="login-container" style={containerStyle}>
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to Dojeon</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
          <p><a href="/forgot-password">Forgot password?</a></p>
        </div>
        
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: test@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 