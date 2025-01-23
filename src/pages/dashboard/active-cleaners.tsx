import { useState, useEffect } from 'react';
import { CleanersTable } from '@/components/dashboard/cleaners-table';
import { Cleaner } from '@/lib/types';
import { getCleaners, updateCleanerEnableState } from '@/lib/api';
import { toast } from 'sonner';

export default function ActiveCleanersPage() {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCleaners();
  }, []);
  // useEffect(() => {
  //   loadCleaners();
  // }, [currentPage]);

  const loadCleaners = async () => {
    try {
      setIsLoading(true);
      const response = await getCleaners({
        page: 1,
        limit: 10,
        status: 'Approved',
      });
      setCleaners(response.data.data);
    } catch {
      toast.error('Failed to load cleaners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableStateChange = async (cleanerId: string, isEnabled: boolean): Promise<void> => {
    try {
      // Optionally set a loading state (if applicable)
      console.log(`Updating cleaner ${cleanerId} to ${isEnabled ? 'enabled' : 'disabled'}...`);

      // Call the API to update the cleaner's state
      const response = await updateCleanerEnableState({ cleanerId, isEnabled });

      if (response.success) {
        console.log(`Cleaner ${cleanerId} updated successfully.`);

        // Reload the list of cleaners
        await loadCleaners();
      } else {
        console.error(`Failed to update cleaner: ${response.message}`);
      }
    } catch (error) {
      console.error('An error occurred while updating the cleaner state:', error);

      // Display a user-friendly error (e.g., a toast or alert)
      alert('Failed to update cleaner. Please try again.');
    }
  };


  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Active Cleaners</h1>
      </div>
      <CleanersTable
        cleaners={cleaners}
        activeTable
        onEnableStateChange={handleEnableStateChange}
        isLoading={isLoading}
      />
    </div>
  );
}