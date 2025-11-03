import React from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with app brand and simple navigation */
  return (
    <header className="app-header">
      <div className="u-container" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div aria-hidden className="u-gradient-soft" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--color-border)' }} />
          <strong style={{ fontSize: 18 }}>Foodly</strong>
        </div>
        <nav aria-label="Primary" style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <a className="u-link" href="/">Home</a>
          <a className="u-link" href="/restaurants">Restaurants</a>
          <a className="u-link" href="/login">Login</a>
          <a className="u-link" href="/register" role="button">Register</a>
        </nav>
      </div>
    </header>
  );
}
