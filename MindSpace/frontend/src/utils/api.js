const BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    clearAuthToken();
    window.location.reload();
  }
  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data?.detail || 'Request failed');
    err.status = response.status;
    throw err;
  }

  return data;
};

export const getAuthToken = () => localStorage.getItem('authToken');
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const clearAuthToken = () => localStorage.removeItem('authToken');