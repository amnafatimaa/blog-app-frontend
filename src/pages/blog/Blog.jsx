import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './Blog.module.css';
import axios from 'axios';
import API_BASE_URL from '../../config.js';

const Blog = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [editPost, setEditPost] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (id) {
      axios
        .get(`${API_BASE_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPost(response.data);
          setComments(response.data.comments || []);
        })
        .catch(() => {
          setError('Failed to load post.');
        })
        .finally(() => setLoading(false));

      if (token) {
        axios
          .get(`${API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCurrentUser(response.data);
          })
          .catch(() => {
            setError('Failed to load user data.');
          });
      }
    } else {
      axios
        .get(`${API_BASE_URL}/posts`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch(() => {
          setError('Failed to load posts.');
        })
        .finally(() => setLoading(false));
    }
  }, [id, token]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/${postId}/comments/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch {
      setError('Failed to load comments.');
    }
  };

  useEffect(() => {
    if (id && post) {
      fetchComments(id);
    }
  }, [id, post, token]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token || !id) return;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments/${id}/comments/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
      fetchComments(id);
    } catch {
      setError('Failed to add comment.');
    }
  };

  const handleDeletePost = async () => {
    if (!token || !id) return;
    setAlert({ message: 'Are you sure you want to delete this post?', type: 'confirm' });
  };

  const confirmDeletePost = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/blog');
      setAlert({ message: 'Post deleted successfully!', type: 'success' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    } catch {
      setAlert({ message: 'Failed to delete post.', type: 'error' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  };

  const cancelDeletePost = () => {
    setAlert({ message: 'Deletion cancelled.', type: 'info' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleUpdatePost = () => {
    if (!token || !id) return;
    setEditPost(true);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveUpdatePost = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/posts/${id}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(response.data);
      setEditPost(false);
      setAlert({ message: 'Post updated successfully!', type: 'success' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    } catch {
      setAlert({ message: 'Failed to update post.', type: 'error' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  };

  const cancelUpdatePost = () => {
    setEditPost(false);
    setAlert({ message: 'Update cancelled.', type: 'info' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleUpdateComment = (commentId) => {
    if (!token || !id) return;
    const comment = comments.find((c) => c.id === commentId);
    setEditCommentId(commentId);
    setEditCommentContent(comment?.content || '');
  };

  const saveUpdateComment = async (commentId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/comments/${id}/comments/${commentId}`,
        { content: editCommentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(comments.map((c) => (c.id === commentId ? response.data : c)));
      fetchComments(id);
      setEditCommentId(null);
      setAlert({ message: 'Comment updated successfully!', type: 'success' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    } catch {
      setAlert({ message: 'Failed to update comment.', type: 'error' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  };

  const cancelUpdateComment = () => {
    setEditCommentId(null);
    setAlert({ message: 'Update cancelled.', type: 'info' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleDeleteComment = (commentId) => {
    if (!token || !id) return;
    setAlert({ message: 'Are you sure you want to delete this comment?', type: 'confirm' });
    setEditCommentId(commentId);
  };

  const confirmDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/comments/${id}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(comments.filter((c) => c.id !== commentId));
      fetchComments(id);
      setEditCommentId(null);
      setAlert({ message: 'Comment deleted successfully!', type: 'success' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    } catch {
      setAlert({ message: 'Failed to delete comment.', type: 'error' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  };

  const cancelDeleteComment = () => {
    setEditCommentId(null);
    setAlert({ message: 'Deletion cancelled.', type: 'info' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(/\s+/).length : 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  if (id && post) {
    return (
      <div className={styles.blogContainer}>
        {alert.message && (
          <div className={`${styles.alert} ${styles[alert.type]}`}>
            {alert.type === 'confirm' && editCommentId !== null ? (
              <>
                {alert.message}
                <button onClick={() => confirmDeleteComment(editCommentId)} className={styles.alertBtn}>Yes</button>
                <button onClick={cancelDeleteComment} className={styles.alertBtn}>No</button>
              </>
            ) : alert.type === 'confirm' ? (
              <>
                {alert.message}
                <button onClick={confirmDeletePost} className={styles.alertBtn}>Yes</button>
                <button onClick={cancelDeletePost} className={styles.alertBtn}>No</button>
              </>
            ) : (
              alert.message
            )}
          </div>
        )}
        <h1 className={styles.blogTitle}>{post.title}</h1>
        <div className={styles.blogPost}>
          {editPost ? (
            <div className={styles.editForm}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.editInput}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={styles.editTextarea}
              />
              <div className="buttonssc">
              <button onClick={saveUpdatePost} className={styles.actionBtn}>Save</button>
              <button onClick={cancelUpdatePost} className={styles.actionBtn}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postMeta}>
                By {post.author?.username || 'Unknown'} |{' '}
                {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''} | Read Time: {calculateReadTime(post.content)}
              </p>
              <p className={styles.postContent}>{post.content}</p>
              {token && post.author && currentUser && post.author.id === currentUser.id && (
                <div className={styles.postActions}>
                  <button onClick={handleUpdatePost} className={styles.actionBtn}>
                    Edit Post
                  </button>
                  <button onClick={handleDeletePost} className={styles.actionBtn}>
                    Delete Post
                  </button>
                </div>
              )}
            </>
          )}
          <h3 className={styles.commentsTitle}>Comments</h3>
          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className={styles.commentInput}
              required
              disabled={!token}
            />
            <button type="submit" className={styles.commentBtn} disabled={!token}>
              Add Comment
            </button>
          </form>
          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                {editCommentId === comment.id ? (
                  <div className={styles.editForm}>
                    <textarea
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      className={styles.editTextarea}
                    />
                    <button onClick={() => saveUpdateComment(comment.id)} className={styles.actionBtn}>Save</button>
                    <button onClick={cancelUpdateComment} className={styles.actionBtn}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <small>By {comment.user?.username || 'Anonymous'}</small>
                    {token && currentUser && (
                      <div className={styles.commentActions}>
                        {comment.user?.id === currentUser.id && (
                          <button onClick={() => handleUpdateComment(comment.id)} className={styles.actionBtn}>
                            Edit
                          </button>
                        )}
                        {(comment.user?.id === currentUser.id || (post.author && post.author.id === currentUser.id)) && (
                          <button onClick={() => handleDeleteComment(comment.id)} className={styles.actionBtn}>
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <Link to="/blog" className={styles.backLink}>
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  // Render blog list
  return (
    <div className={styles.blogContainer}>
      {alert.message && (
        <div className={`${styles.alert} ${styles[alert.type]}`}>
          {alert.message}
        </div>
      )}
      <h1 className={styles.blogTitle}>Blog Hub</h1>
      <p className={styles.blogDescription}>
        Explore a collection of insightful articles and stories shared by our community. Launched on July 24, 2025, 
        this space is designed to inspire and connect writers and readers alike. Dive into the latest posts below!
      </p>
      <div className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Latest Articles</h2>
        <div className={styles.postsGrid}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>Featured</span>
                  <span className={styles.postDate}>
                    {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                  </span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>
                  {post.content && post.content.length > 150
                    ? post.content.slice(0, 150) + '...'
                    : post.content}
                </p>
                <p className={styles.postMeta}>
                  By {post.author?.username || 'Unknown'} | Read Time: {calculateReadTime(post.content)}
                </p>
                <div className={styles.postFooter}>
                  <Link
                    to={token ? `/blog/${post.id}` : '/register'}
                    className={styles.readMore}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.noPosts}>No posts available yet.</p>
          )}
        </div>
      </div>
      <div className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Join the Conversation</h2>
        <p className={styles.sectionContent}>
          Ready to share your own story or engage with our community? 
          Register today to unlock full access to articles and start contributing. 
          Visit our <Link to="/about" className={styles.internalLink}>About page</Link> to learn more.
        </p>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Blog;