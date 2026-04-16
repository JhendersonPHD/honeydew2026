/**
 * Base API client with JWT interceptors
 */

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

class ApiClient {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
  }

  // Interceptor registration
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // Base fetch wrapper
  async fetch(endpoint, options = {}) {
    let url = `${this.baseURL}${endpoint}`;

    // Default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Apply request interceptors
    let requestOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      }
    };

    for (const interceptor of this.interceptors.request) {
      requestOptions = await interceptor(requestOptions);
    }

    try {
      const response = await fetch(url, requestOptions);

      // Apply response interceptors
      let parsedResponse = response;
      for (const interceptor of this.interceptors.response) {
        parsedResponse = await interceptor(parsedResponse);
      }

      if (!parsedResponse.ok) {
        const errorData = await parsedResponse.json().catch(() => null);
        throw new ApiError(
          errorData?.error || errorData?.detail || 'API Error',
          parsedResponse.status,
          errorData
        );
      }

      // Check if response has content before parsing JSON
      const contentType = parsedResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         return await parsedResponse.json();
      }
      return null;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message || 'Network error', 0, null);
    }
  }

  // HTTP methods
  get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Add JWT auth interceptor
apiClient.addRequestInterceptor((options) => {
  // Try to get token from localStorage if in browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return options;
});

// Add standard response interceptor for token refresh handling (placeholder for real logic)
apiClient.addResponseInterceptor(async (response) => {
  if (response.status === 401) {
    // Handle unauthorized - possibly trigger refresh or logout
    // In a real app we might try to refresh the token here and retry the request
    if (typeof window !== 'undefined') {
      // localStorage.removeItem('access_token'); // Don't auto-remove just yet, let AuthContext handle it
      // window.dispatchEvent(new Event('auth:unauthorized'));
    }
  }
  return response;
});

export default apiClient;