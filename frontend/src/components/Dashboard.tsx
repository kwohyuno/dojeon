import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dojeon Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {userEmail}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Welcome to Dojeon!</h3>
            <p>This is your dashboard. You can start building your application here.</p>
            <div className="card-actions">
              <button className="primary-button">Get Started</button>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Tasks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Messages</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">🎉</span>
                <div className="activity-content">
                  <p>Welcome to Dojeon!</p>
                  <span className="activity-time">Just now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">Create Project</button>
              <button className="action-button">Add Task</button>
              <button className="action-button">Invite Team</button>
              <button className="action-button">View Reports</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 