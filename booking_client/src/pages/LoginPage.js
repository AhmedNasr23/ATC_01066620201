import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/auth/login`, { email, password });
      
      // Use your context method to store user/token etc.
      login(res.data);
      
      // Redirect to homepage after successful login
      navigate('/');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
