import { getAuthState, onUnauthorizedRedirect } from './authRuntime';

// PUBLIC_INTERFACE
export async function apiFetch(path, { method = 'GET', headers = {}, body, ...rest } = {}) {
  /**
   * Fetch helper that:
   * - Prefixes API base URL
   * - Adds Authorization header if token exists
   * - On 401, logs out and redirects to /login with returnTo
   */
  const { API_BASE, token } = getAuthState();

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const finalHeaders = {
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
    credentials: 'include',
    ...rest,
  });

  if (res.status === 401) {
    onUnauthorizedRedirect();
    throw new Error('Unauthorized');
  }
  return res;
}
