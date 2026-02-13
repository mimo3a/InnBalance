import AsyncStorage from '@react-native-async-storage/async-storage';

// Production / remote API base
const API_URL = 'http://46.224.147.217:8082/api';

async function getAuthHeaders() {
  const token = await AsyncStorage.getItem('token');

  // Only auth header here; content-type is method-specific
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const authHeaders = await getAuthHeaders();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error ${response.status}`);
  }

  if (response.status === 204) return null;

  // Safely handle empty or non-JSON responses (e.g. DELETE 200 with no body)
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(path, {
      method: 'DELETE',
    }),

  // Multipart upload helper (e.g. for images)
  upload: async (path, formData) => {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP error ${response.status}`);
    }

    if (response.status === 204) return null;

    const text = await response.text();
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  },
};
