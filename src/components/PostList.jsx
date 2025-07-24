import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';

const PostList = ({ posts }) => {
  return (
    <div className={styles.postListContainer}>
      <h2 className={styles.postListTitle}>Latest Posts</h2>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link to={`/blog/${post.id}`} className={styles.postLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;