let runtimeAuthState = {
  API_BASE: 'http://localhost:3001',
  token: null,
  logout: () => {},
};

// PUBLIC_INTERFACE
export function bindAuthRuntime(getters) {
  /**
   * Bind live getters from AuthProvider so apiFetch can access token/API_BASE.
   */
  runtimeAuthState = { ...runtimeAuthState, ...getters };
}

// PUBLIC_INTERFACE
export function getAuthState() {
  /**
   * Snapshot current runtime auth info.
   */
  return {
    API_BASE: runtimeAuthState.API_BASE,
    token: runtimeAuthState.token?.(),
    logout: runtimeAuthState.logout,
  };
}

// PUBLIC_INTERFACE
export function onUnauthorizedRedirect() {
  /**
   * If unauthorized, clear auth and redirect to /login?returnTo=<current>
   */
  try {
    runtimeAuthState.logout?.();
  } catch {
    // ignore
  }
  const current = window.location.pathname + window.location.search + window.location.hash;
  const encoded = encodeURIComponent(current);
  window.location.assign(`/login?returnTo=${encoded}`);
}
