import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import jinImage from '../jin.jpeg';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleGoToPosts = () => {
    navigate('/posts');
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <div className="mypage-container" style={containerStyle}>
      <header className="mypage-header">
        <div className="header-content">
          <h1>My Page</h1>
          <div className="user-info">
            <span>Welcome, {userName}</span>
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mypage-main">
        <div className="mypage-grid">
          <div className="mypage-card">
            <h3>Profile Information</h3>
            <div className="profile-info">
              <div className="profile-item">
                <span className="label">Email:</span>
                <span className="value">{userEmail}</span>
              </div>
              <div className="profile-item">
                <span className="label">Member Since:</span>
                <span className="value">January 2024</span>
              </div>
              <div className="profile-item">
                <span className="label">Status:</span>
                <span className="value">Active</span>
              </div>
            </div>
          </div>

          <div className="mypage-card">
            <h3>My Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">45</span>
                <span className="stat-label">Likes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Comments</span>
              </div>
            </div>
          </div>

          <div className="mypage-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">📝</span>
                <div className="activity-content">
                  <p>Posted "Welcome to Dojeon Community!"</p>
                  <span className="activity-time">2 days ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">❤️</span>
                <div className="activity-content">
                  <p>Liked "How to get started with React"</p>
                  <span className="activity-time">3 days ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💬</span>
                <div className="activity-content">
                  <p>Commented on "Spring Boot Backend Development"</p>
                  <span className="activity-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mypage-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">Edit Profile</button>
              <button className="action-button">Change Password</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage; 