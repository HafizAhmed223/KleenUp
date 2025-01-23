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

export interface Cleaner {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  isEnabled: boolean;
  profileImage: string
  dateTime:string
  address:string
  totalJobs:number
  joinedDate:string
  // Add other necessary fields...
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Represents pagination parameters for API requests.
 */
export interface PaginationParams {
  page: number;
  limit: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

/**
 * Represents the response for paginated data.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Request data to update a cleaner's enable state.
 */
export interface UpdateCleanerEnableStateRequest {
  cleanerId: string;
  isEnabled: boolean;
}

/**
 * Request data to update a cleaner's status.
 */
export interface UpdateCleanerStatusRequest {
  cleanerId: string;
  status: 'All' | 'Pending' | 'Approved' | 'Rejected';
}

/**
 * Request data to update a cleaner's enable state.
 */
export interface UpdateCleanerEnableStateRequest {
  cleanerId: string;
  isEnabled: boolean;
}

/**
 * Request data to update a cleaner's status.
 */
export interface UpdateCleanerStatusRequest {
  cleanerId: string;
  status: CleanerStatus;
}

// Add these in '@/lib/types' file
export type CleanerStatus = 'All' | 'Pending' | 'Approved' | 'Rejected';

export interface StatusFilter {
  status?: 'All' | CleanerStatus;  // Include 'All' as an option
}
