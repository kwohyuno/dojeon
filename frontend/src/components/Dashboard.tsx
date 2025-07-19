import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';
import jinImage from '../jin.jpeg';
import './Dashboard.css';

interface DashboardProps {
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleGoToMyPage = () => {
    navigate('/mypage');
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <div className="dashboard-container" style={containerStyle}>
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dojeon</h1>
          <div className="user-info">
            <span>Welcome, {userEmail}</span>
            <button onClick={handleGoToMyPage} className="mypage-button">
              My Page
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <PostList />
      </main>
    </div>
  );
};

export default Dashboard; 