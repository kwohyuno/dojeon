import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import jinImage from '../jin.jpeg';

interface UserProfile {
  email: string;
  name: string;
  memberSince: string;
  status: string;
}

interface UserStatistics {
  postCount: number;
  commentCount: number;
  likeCount: number;
}

interface UserActivity {
  recentPosts: Array<{
    id: number;
    title: string;
    createdAt: string;
  }>;
  recentComments: Array<{
    id: number;
    content: string;
    createdAt: string;
  }>;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile data
        const profileResponse = await fetch(`http://localhost:8080/api/users/profile?email=${encodeURIComponent(userEmail)}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }

        // Fetch statistics data
        const statsResponse = await fetch(`http://localhost:8080/api/users/statistics?email=${encodeURIComponent(userEmail)}`);
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStatistics(statsData);
        }

        // Fetch activity data
        const activityResponse = await fetch(`http://localhost:8080/api/users/activity?email=${encodeURIComponent(userEmail)}`);
        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          setActivity(activityData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

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
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">Loading...</div>
          </div>
        ) : (
          <div className="mypage-grid">
            <div className="mypage-card">
              <h3>Profile Information</h3>
              <div className="profile-info">
                <div className="profile-item">
                  <span className="label">Email:</span>
                  <span className="value">{profile?.email || userEmail}</span>
                </div>
                <div className="profile-item">
                  <span className="label">Name:</span>
                  <span className="value">{profile?.name || userName}</span>
                </div>
                <div className="profile-item">
                  <span className="label">Member Since:</span>
                  <span className="value">
                    {profile?.memberSince ? new Date(profile.memberSince).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="profile-item">
                  <span className="label">Status:</span>
                  <span className="value">{profile?.status || 'Active'}</span>
                </div>
              </div>
            </div>

            <div className="mypage-card">
              <h3>My Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{statistics?.postCount || 0}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{statistics?.likeCount || 0}</span>
                  <span className="stat-label">Likes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{statistics?.commentCount || 0}</span>
                  <span className="stat-label">Comments</span>
                </div>
              </div>
            </div>

            <div className="mypage-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {activity?.recentPosts?.map((post, index) => (
                  <div key={`post-${index}`} className="activity-item">
                    <span className="activity-icon">📝</span>
                    <div className="activity-content">
                      <p>Posted "{post.title}"</p>
                      <span className="activity-time">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                {activity?.recentComments?.map((comment, index) => (
                  <div key={`comment-${index}`} className="activity-item">
                    <span className="activity-icon">💬</span>
                    <div className="activity-content">
                      <p>Commented: "{comment.content.substring(0, 50)}..."</p>
                      <span className="activity-time">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                {(!activity?.recentPosts?.length && !activity?.recentComments?.length) && (
                  <div className="activity-item">
                    <span className="activity-icon">📊</span>
                    <div className="activity-content">
                      <p>No recent activity</p>
                      <span className="activity-time">Start posting to see your activity here!</span>
                    </div>
                  </div>
                )}
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
        )}
      </main>
    </div>
  );
};

export default MyPage; 