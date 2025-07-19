import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jinImage from '../jin.jpeg';
import './Write.css';

const Write: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    setIsSubmitting(true);
    
    // 임시로 1초 후 완료 처리 (나중에 API로 교체)
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Post created successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <div className="write-container" style={containerStyle}>
      <header className="write-header">
        <div className="header-content">
          <h1>Write Post</h1>
          <div className="header-actions">
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </header>

      <main className="write-main">
        <div className="write-card">
          <form onSubmit={handleSubmit} className="write-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter your post title..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
                placeholder="Write your post content here..."
                rows={12}
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Write; 