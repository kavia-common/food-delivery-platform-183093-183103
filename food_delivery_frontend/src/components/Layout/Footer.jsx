import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with simple app info */
  return (
    <footer className="app-footer">
      <div className="u-container" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          © {new Date().getFullYear()} Foodly. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <a className="u-link" href="/privacy">Privacy</a>
          <a className="u-link" href="/terms">Terms</a>
          <a className="u-link" href="/help">Help</a>
        </div>
      </div>
    </footer>
  );
}
