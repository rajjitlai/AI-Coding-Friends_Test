import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .get('/me')
      .then((res) => {
        if (!mounted) return;
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    return () => (mounted = false);
  }, [navigate]);

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Member since:</strong> {user.created_at}
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
