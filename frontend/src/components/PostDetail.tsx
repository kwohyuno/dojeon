import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';
import jinImage from '../jin.jpeg';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (currentIdRef.current !== id) {
      setPost(null);
      setLoading(true);
      setError(null);
      currentIdRef.current = id || null;
    }

    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';

    const fetchPost = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      console.log('Fetching post:', id, 'at', new Date().toISOString());
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          signal: abortControllerRef.current.signal,
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        console.log('Post fetched:', data.id, 'at', new Date().toISOString());
        setPost(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Request aborted for post:', id);
          return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPost((prevPost: any) => ({
          ...prevPost,
          likeCount: prevPost.likeCount + 1
        }));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-content">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="post-views">Views: {post.viewCount}</span>
          <span className="post-likes">Likes: {post.likeCount}</span>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <button onClick={handleLike} className="like-button">
            ❤️ Like
          </button>
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 