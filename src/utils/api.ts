// API utility functions for better error handling

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export async function safeApiCall<T = any>(
  url: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const contentType = response.headers.get('content-type');
    
    // Check if response is JSON
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', {
        status: response.status,
        contentType,
        text: text.substring(0, 200) + (text.length > 200 ? '...' : '')
      });
      
      return {
        success: false,
        error: `Server returned ${response.status}. Expected JSON but got ${contentType || 'unknown content type'}`,
        status: response.status
      };
    }

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data,
        status: response.status
      };
    } else {
      return {
        success: false,
        error: data.message || data.error || 'Request failed',
        status: response.status
      };
    }
  } catch (error) {
    console.error('API call failed:', error);
    
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return {
        success: false,
        error: 'Server returned invalid JSON response. This usually means the API endpoint is not working correctly.',
        status: 0
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0
    };
  }
}

export function getAuthHeaders(token?: string) {
  const authToken = token || localStorage.getItem('authToken');
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}