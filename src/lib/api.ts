import { ApiResponse, Cleaner, PaginatedResponse, PaginationParams, UpdateCleanerEnableStateRequest, UpdateCleanerStatusRequest } from './types';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * API Endpoints for Cleaner Management
 * 
 * This module contains all the API calls related to cleaner management.
 * Replace the mock implementations with actual API calls when backend is ready.
 */

// Mock data for development
const mockCleaners: Cleaner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1 234 567 890',
    dateTime: '2024-03-20 14:30',
    status: 'Pending',
    isEnabled: false,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    address: '123 Main St, New York, NY',
    rating: 4.5,
    totalJobs: 150,
    joinedDate: '2023-12-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '+1 345 678 901',
    dateTime: '2024-03-19 09:15',
    status: 'Approved',
    isEnabled: true,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    address: '456 Oak Ave, Los Angeles, CA',
    rating: 4.8,
    totalJobs: 280,
    joinedDate: '2023-10-15',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phoneNumber: '+1 456 789 012',
    dateTime: '2024-03-18 16:45',
    status: 'Rejected',
    isEnabled: false,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    address: '789 Pine St, Chicago, IL',
    rating: 3.2,
    totalJobs: 45,
    joinedDate: '2024-01-20',
  },
];

/**
 * Fetch cleaners with pagination and filters
 * 
 * @param params Pagination and filter parameters
 * @returns Promise with paginated cleaner data
 */
export async function getCleaners(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<Cleaner>>> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/cleaners?${new URLSearchParams(params)}`);
  // return response.json();

  // Mock implementation
  const { page, limit, status } = params;
  const filteredCleaners = status ? mockCleaners.filter(c => c.status === status) : mockCleaners;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    success: true,
    message: 'Cleaners fetched successfully',
    data: {
      data: filteredCleaners.slice(start, end),
      total: filteredCleaners.length,
      page,
      limit,
      totalPages: Math.ceil(filteredCleaners.length / limit),
    },
  };
}

/**
 * Update cleaner's status (Approve/Reject)
 * 
 * @param data Status update request data
 * @returns Promise with updated cleaner data
 */
export async function updateCleanerStatus(data: UpdateCleanerStatusRequest): Promise<ApiResponse<Cleaner>> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/cleaners/${data.cleanerId}/status`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Mock implementation
  const cleaner = mockCleaners.find(c => c.id === data.cleanerId);
  if (!cleaner) {
    throw new Error('Cleaner not found');
  }
  cleaner.status = data.status;
  return {
    success: true,
    message: `Cleaner status updated to ${data.status}`,
    data: cleaner,
  };
}

/**
 * Update cleaner's enable state
 * 
 * @param data Enable state update request data
 * @returns Promise with updated cleaner data
 */
export async function updateCleanerEnableState(data: UpdateCleanerEnableStateRequest): Promise<ApiResponse<Cleaner>> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/cleaners/${data.cleanerId}/enable-state`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Mock implementation
  const cleaner = mockCleaners.find(c => c.id === data.cleanerId);
  if (!cleaner) {
    throw new Error('Cleaner not found');
  }
  cleaner.isEnabled = data.isEnabled;
  return {
    success: true,
    message: `Cleaner ${data.isEnabled ? 'enabled' : 'disabled'} successfully`,
    data: cleaner,
  };
}

/**
 * Get cleaner details by ID
 * 
 * @param id Cleaner ID
 * @returns Promise with cleaner details
 */
export async function getCleanerById(id: string): Promise<ApiResponse<Cleaner>> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/cleaners/${id}`);
  // return response.json();

  // Mock implementation
  const cleaner = mockCleaners.find(c => c.id === id);
  if (!cleaner) {
    throw new Error('Cleaner not found');
  }
  return {
    success: true,
    message: 'Cleaner details fetched successfully',
    data: cleaner,
  };
}