import { Admin, ApiResponse, AuthResponse, LoginCredentials } from './types';

const AUTH_TOKEN_KEY = 'kleenup_auth_token';
const AUTH_USER_KEY = 'kleenup_auth_user';

// Mock admin for development
const MOCK_ADMIN: Admin = {
  id: '1',
  name: 'John Admin',
  email: 'john@kleenup.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
};

/**
 * Login with email and password
 * 
 * @param credentials Login credentials
 * @returns Promise with auth response
 */
export async function login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials),
  // });
  // const data = await response.json();

  // Mock implementation
  // In production, validate credentials against backend
  if (credentials.email !== 'admin@kleenup.com' || credentials.password !== 'admin123') {
    throw new Error('Invalid credentials');
  }

  const authResponse: AuthResponse = {
    admin: MOCK_ADMIN,
    token: 'mock_jwt_token',
  };

  // Store auth data
  localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authResponse.admin));

  return {
    success: true,
    message: 'Login successful',
    data: authResponse,
  };
}

/**
 * Logout current user
 */
export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

/**
 * Get current authenticated admin
 * 
 * @returns Admin object if authenticated, null otherwise
 */
export function getCurrentAdmin(): Admin | null {
  const adminJson = localStorage.getItem(AUTH_USER_KEY);
  return adminJson ? JSON.parse(adminJson) : null;
}

/**
 * Get authentication token
 * 
 * @returns JWT token if authenticated, null otherwise
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 * 
 * @returns boolean indicating auth status
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}