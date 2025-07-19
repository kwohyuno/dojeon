import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jinImage from '../jin.jpeg';
import './PostDetail.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  likes: number;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 임시 데이터 - 나중에 API로 교체
    const mockPost: Post = {
      id: parseInt(id || '1'),
      title: "Welcome to Dojeon Community!",
      content: `This is our first post. Welcome everyone to our community.

We're excited to have you here! This platform is designed to bring together developers, designers, and tech enthusiasts from around the world.

Here's what you can do:
- Share your knowledge and experiences
- Ask questions and get help from the community
- Discover new technologies and trends
- Connect with like-minded individuals

Feel free to explore the platform and start contributing to our growing community. Together, we can learn, grow, and build amazing things!`,
      author: "Admin",
      date: "2024-01-15",
      views: 150,
      likes: 25
    };
    setPost(mockPost);
  }, [id]);

  const handleLike = () => {
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1
      });
      setIsLiked(!isLiked);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  if (!post) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="post-detail-container" style={containerStyle}>
      <div className="post-detail-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Posts
        </button>
      </div>

      <div className="post-detail-card">
        <div className="post-detail-content">
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-detail-meta">
            <span className="post-detail-author">by {post.author}</span>
            <span className="post-detail-date">{post.date}</span>
            <div className="post-detail-stats">
              <span className="stat">
                <span className="stat-icon">👁️</span>
                {post.views} views
              </span>
              <span className="stat">
                <span className="stat-icon">❤️</span>
                {post.likes} likes
              </span>
            </div>
          </div>

          <div className="post-detail-body">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="post-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="post-detail-actions">
            <button 
              onClick={handleLike} 
              className={`like-button ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '❤️' : '🤍'} {post.likes} Likes
            </button>
            <button className="share-button">
              📤 Share
            </button>
            <button className="comment-button">
              💬 Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 