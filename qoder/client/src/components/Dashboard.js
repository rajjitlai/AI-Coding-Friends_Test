import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container">
        <div className="form-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">Auth System</div>
        <div className="navbar-links">
          <button onClick={handleLogout} className="link-button">
            Logout
          </button>
        </div>
      </nav>
      
      <div className="dashboard-container">
        <div className="card">
          <h2 className="card-title">Welcome to your Dashboard!</h2>
          <p>You are successfully logged in.</p>
          
          <div className="user-info">
            <h3>User Information</h3>
            <div className="user-info-item">
              <span className="user-info-label">ID:</span> {user.id}
            </div>
            <div className="user-info-item">
              <span className="user-info-label">Email:</span> {user.email}
            </div>
            <div className="user-info-item">
              <span className="user-info-label">Member since:</span> {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;