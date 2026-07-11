const DEFAULT_LOCAL_API_BASE = 'http://localhost:8080';

export const getApiBaseUrl = (): string => {
  const configured = (import.meta.env.VITE_API_URL || '').trim();
  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (import.meta.env.DEV && isLocalhost) {
    return DEFAULT_LOCAL_API_BASE;
  }

  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  return DEFAULT_LOCAL_API_BASE;
};

export const apiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();
  const baseWithApi = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  return `${baseWithApi}${normalizedPath}`;
};

export const googleAuthUrl = (): string => apiUrl('/auth/google');
