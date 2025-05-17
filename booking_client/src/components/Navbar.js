import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="font-bold text-xl">EventApp</Link>
      </div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user && user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded ml-2">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
