import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Auth context for managing authentication state (user and token) across the app.
 * Exposes login, register, and logout methods that integrate with the backend.
 */

// Constants
const STORAGE_KEY = 'fd_auth';

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  // Methods
  login: async (_email, _password) => {},
  register: async (_payload) => {},
  logout: () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides auth state and operations.
   * Persist token and basic user display in localStorage for session continuity.
   */
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Prefer env var REACT_APP_API_BASE; fallback to running backend default port 3001.
  const API_BASE = useMemo(() => {
    const base = process.env.REACT_APP_API_BASE?.trim();
    if (base) return base.replace(/\/+$/, '');
    // Attempt to infer same host different port for CORS-friendly local dev
    try {
      const loc = window?.location;
      if (loc) {
        const proto = loc.protocol;
        const host = loc.hostname;
        // if frontend on 3000, backend likely on 3001
        return `${proto}//${host}:3001`;
      }
    } catch {
      // no-op
    }
    return 'http://localhost:3001';
  }, []);

  // Load from storage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { token: storedToken, user: storedUser } = JSON.parse(raw);
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(storedUser);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Persist to storage when token/user change
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [token, user]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      // Call backend /auth/login
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await safeJson(res);
        const message = err?.detail || err?.message || 'Login failed';
        throw new Error(message);
      }
      const data = await res.json();
      // Expected schema: { access_token, token_type? }
      if (!data?.access_token) {
        throw new Error('Invalid login response');
      }
      setToken(data.access_token);
      // we don't have a /me endpoint in spec; infer minimal user from email
      setUser({ email });
      return { token: data.access_token, user: { email } };
    },
    [API_BASE]
  );

  const register = useCallback(
    async ({ email, password, full_name }) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name }),
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await safeJson(res);
        const message = err?.detail || err?.message || 'Registration failed';
        throw new Error(message);
      }
      const userOut = await res.json();
      // registration does not return a token per spec; require user to login afterwards
      return userOut;
    },
    [API_BASE]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      API_BASE,
    }),
    [user, token, login, register, logout, API_BASE]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}
