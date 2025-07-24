import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Blog.module.css';
import axios from 'axios';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

const Blog = ({ token }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));

    axios.get(`http://localhost:8000/comments/${id}/comments/`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [id]);

  return (
    <div className={styles.blogContainer}>
      {post ? (
        <>
          <h1 className={styles.blogTitle}>{post.title}</h1>
          <div className={styles.blogPost}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDate}>{new Date(post.created_at).toLocaleDateString()}</p>
            <p className={styles.postContent}>{post.content}</p>
          </div>
          <h2 className={styles.commentsTitle}>Comments</h2>
          <CommentList comments={comments} />
          {token && <CommentForm postId={id} token={token} />}
        </>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Blog;