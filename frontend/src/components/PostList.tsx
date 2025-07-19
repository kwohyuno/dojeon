import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostList.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  likes: number;
}

const PostList: React.FC = () => {
  const navigate = useNavigate();
  const [posts] = useState<Post[]>([
    {
      id: 1,
      title: "Welcome to Dojeon Community!",
      content: "This is our first post. Welcome everyone to our community.",
      author: "Admin",
      date: "2024-01-15",
      views: 150,
      likes: 25
    },
    {
      id: 2,
      title: "How to get started with React",
      content: "Learn the basics of React development with this comprehensive guide.",
      author: "Developer",
      date: "2024-01-14",
      views: 89,
      likes: 12
    },
    {
      id: 3,
      title: "Spring Boot Backend Development",
      content: "Building robust backend services with Spring Boot framework.",
      author: "Backend Dev",
      date: "2024-01-13",
      views: 67,
      likes: 8
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      content: "Essential design principles for creating beautiful user interfaces.",
      author: "Designer",
      date: "2024-01-12",
      views: 234,
      likes: 45
    },
    {
      id: 5,
      title: "Database Optimization Tips",
      content: "Best practices for optimizing your database performance.",
      author: "DBA",
      date: "2024-01-11",
      views: 156,
      likes: 32
    }
  ]);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleWritePost = () => {
    navigate('/write');
  };

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>Dojeon Community</h1>
        <button onClick={handleWritePost} className="write-button">
          Write Post
        </button>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="post-item"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.content.substring(0, 100)}...</p>
              <div className="post-meta">
                <span className="post-author">by {post.author}</span>
                <span className="post-date">{post.date}</span>
              </div>
            </div>
            <div className="post-stats">
              <div className="stat">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{post.views}</span>
              </div>
              <div className="stat">
                <span className="stat-icon">❤️</span>
                <span className="stat-value">{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList; 