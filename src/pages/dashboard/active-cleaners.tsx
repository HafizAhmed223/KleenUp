import { useState, useEffect } from 'react';
import { CleanersTable } from '@/components/dashboard/cleaners-table';
import { Cleaner } from '@/lib/types';
import { getCleaners, updateCleanerEnableState } from '@/lib/api';
import { toast } from 'sonner';

export default function ActiveCleanersPage() {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCleaners();
  }, [currentPage]);

  const loadCleaners = async () => {
    try {
      setIsLoading(true);
      const response = await getCleaners({
        page: currentPage,
        limit: 10,
        status: 'Approved',
      });
      setCleaners(response.data.data);
    } catch (error) {
      toast.error('Failed to load cleaners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableStateChange = async (cleanerId: string, isEnabled: boolean) => {
    try {
      await updateCleanerEnableState({ cleanerId, isEnabled });
      await loadCleaners();
    } catch (error) {
      throw error;
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