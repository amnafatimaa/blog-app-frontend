import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../newpost/Newpost.module.css';

const Newpost = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setMessage(null); // Clear message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Please log in to create a post.');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8000/posts/',
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Assuming token-based authentication
          },
        }
      );
      console.log('Post created:', response.data);
      setMessage('Post created successfully!');
      setTimeout(() => navigate('/blog'), 1000); // Redirect after 1 second
    } catch (err) {
      console.error('Error creating post:', err.response ? err.response.data : err.message);
      setMessage('Failed to create post. Check the console for details.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-600 mb-4">You must be logged in to create a post.</p>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Post</h1>
        {message && (
          <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32 resize-y"
              placeholder="Enter post content"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Post
          </button>
        </form>
        <Link
          to="/blog"
          className="block mt-4 text-center text-blue-500 hover:text-blue-700"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default Newpost;