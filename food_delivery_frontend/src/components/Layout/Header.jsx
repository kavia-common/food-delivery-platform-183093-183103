import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with app brand and simple navigation */
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.assign('/');
  };

  return (
    <header className="app-header">
      <div className="u-container" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div aria-hidden className="u-gradient-soft" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--color-border)' }} />
          <strong style={{ fontSize: 18 }}>Foodly</strong>
        </div>
        <nav aria-label="Primary" style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <a className="u-link" href="/">Home</a>
          <a className="u-link" href="/restaurants">Restaurants</a>
          {!isAuthenticated ? (
            <>
              <a className="u-link" href="/login">Login</a>
              <a className="u-link" href="/register" role="button">Register</a>
            </>
          ) : (
            <>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
                {user?.full_name || user?.email || 'Account'}
              </span>
              <a className="u-link" href="/logout" onClick={handleLogout}>Logout</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
