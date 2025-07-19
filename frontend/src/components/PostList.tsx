import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostList.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}

const PostList: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleWritePost = () => {
    navigate('/write');
  };

  if (loading) {
    return (
      <div className="post-list-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>Dojeon Community</h1>
        <button onClick={handleWritePost} className="write-button">
          Write Post
        </button>
      </div>

      <div className="post-list">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to write a post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="post-item"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content}
                </p>
                <div className="post-meta">
                  <span className="post-author">by {post.author}</span>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="post-stats">
                <div className="stat">
                  <span className="stat-icon">👁️</span>
                  <span className="stat-value">{post.viewCount}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">❤️</span>
                  <span className="stat-value">{post.likeCount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList; 