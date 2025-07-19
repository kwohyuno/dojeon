import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jinImage from '../jin.jpeg';
import './PostDetail.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;

    try {
      const url = `http://localhost:8080/api/posts/${post.id}/like`;
      const method = isLiked ? 'DELETE' : 'POST';
      
      const response = await fetch(url, { method });
      if (response.ok) {
        setPost(prev => prev ? {
          ...prev,
          likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1
        } : null);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error('Failed to update like:', err);
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

  if (loading) {
    return (
      <div className="post-detail-container" style={containerStyle}>
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-container" style={containerStyle}>
        <div className="error">Error: {error || 'Post not found'}</div>
      </div>
    );
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
            <span className="post-detail-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <div className="post-detail-stats">
              <span className="stat">
                <span className="stat-icon">👁️</span>
                {post.viewCount} views
              </span>
              <span className="stat">
                <span className="stat-icon">❤️</span>
                {post.likeCount} likes
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
              {isLiked ? '❤️' : '🤍'} {post.likeCount} Likes
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