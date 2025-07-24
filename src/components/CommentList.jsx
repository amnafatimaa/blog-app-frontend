import React from 'react';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
  return (
    <div className={styles.commentListContainer}>
      <h2 className={styles.commentListTitle}>Comments</h2>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <p className={styles.commentContent}>{comment.content}</p>
            <p className={styles.commentDate}>{new Date(comment.updated_at || comment.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;