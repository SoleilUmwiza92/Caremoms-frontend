import React from 'react';
import { useAuth } from '../auth/useAuth';
import './header.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">💝</span>
          <h1>Caremoms</h1>
        </div>

        {user && (
          <div className="user-profile">
            <span className="user-name">
              {user.firstName || user.username}
            </span>
            <div className="user-avatar">
              {(user.firstName || user.username).charAt(0).toUpperCase()}
            </div>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;