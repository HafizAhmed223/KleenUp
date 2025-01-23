import { ApiResponse, Cleaner, PaginatedResponse, PaginationParams, UpdateCleanerEnableStateRequest, UpdateCleanerStatusRequest } from './types';

// Uncomment when switching to real API
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Mock data for development
 */
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
    totalJobs: 150,
    joinedDate: '2023-12-01',
  },
  // Add more mock cleaners as needed
];

/**
 * Fetch cleaners with pagination and filters
 */
export async function getCleaners(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<Cleaner>>> {
  try {
    // Uncomment for real API integration
    // const response = await fetch(`${API_BASE_URL}/cleaners?${new URLSearchParams(params)}`);
    // if (!response.ok) throw new Error('Failed to fetch cleaners');
    // return await response.json();

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
  } catch (error) {
    console.error('Error fetching cleaners:', error);
    throw new Error('Unable to fetch cleaners. Please try again later.');
  }
}

/**
 * Update cleaner's status (Approve/Reject)
 */
export async function updateCleanerStatus(data: UpdateCleanerStatusRequest): Promise<ApiResponse<Cleaner>> {
  try {
    // Uncomment for real API integration
    // const response = await fetch(`${API_BASE_URL}/cleaners/${data.cleanerId}/status`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Failed to update cleaner status');
    // return await response.json();

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
  } catch (error) {
    console.error('Error updating cleaner status:', error);
    throw new Error('Unable to update cleaner status. Please try again later.');
  }
}

/**
 * Update cleaner's enable state
 */
export async function updateCleanerEnableState(data: UpdateCleanerEnableStateRequest): Promise<ApiResponse<Cleaner>> {
  try {
    // Uncomment for real API integration
    // const response = await fetch(`${API_BASE_URL}/cleaners/${data.cleanerId}/enable-state`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Failed to update cleaner enable state');
    // return await response.json();

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
  } catch (error) {
    console.error('Error updating cleaner enable state:', error);
    throw new Error('Unable to update cleaner enable state. Please try again later.');
  }
}

/**
 * Get cleaner details by ID
 */
export async function getCleanerById(id: string): Promise<ApiResponse<Cleaner>> {
  try {
    // Uncomment for real API integration
    // const response = await fetch(`${API_BASE_URL}/cleaners/${id}`);
    // if (!response.ok) throw new Error('Failed to fetch cleaner details');
    // return await response.json();

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
  } catch (error) {
    console.error('Error fetching cleaner details:', error);
    throw new Error('Unable to fetch cleaner details. Please try again later.');
  }
}
