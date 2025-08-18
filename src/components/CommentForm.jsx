import React, { useState } from 'react';
import axios from 'axios';
import styles from './CommentForm.module.css';
import API_BASE_URL from './../config.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentForm = ({ postId, token }) => {
  const [content, setContent] = useState('');
  const [commentId, setCommentId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = commentId
        ? `${API_BASE_URL}/comments/${postId}/comments/${commentId}`
        : `${API_BASE_URL}/comments/${postId}/comments/`;
      const method = commentId ? 'put' : 'post';

      await axios[method](url, { content }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContent('');
      setCommentId(null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className={styles.commentFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          placeholder="Write a comment..."
          required
        />
        <button type="submit" className={styles.submitButton}>
          {commentId ? 'Update Comment' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
