import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children }) {
  /**
   * Guards children content by checking authentication.
   * If not authenticated, redirects to /login with returnTo param.
   */
  const { isAuthenticated } = useContext(AuthContext);

  useMemo(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const current = window.location.pathname + window.location.search + window.location.hash;
      const encoded = encodeURIComponent(current);
      window.location.assign(`/login?returnTo=${encoded}`);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="u-container" style={{ paddingTop: 24 }}>
        <p>Redirecting to login...</p>
      </div>
    );
  }
  return children;
}
