import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', credentials);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setToken(token);
      if (onLogin) onLogin();
      setError('');
    } catch (err) {
      setError('Login failed. Check username/password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;