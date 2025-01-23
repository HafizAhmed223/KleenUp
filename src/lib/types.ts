// Existing types...

// Auth Types
export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  admin: Admin;
  token: string;
}

// Update ApiResponse to include auth responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}