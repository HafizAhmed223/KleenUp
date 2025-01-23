import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CleanersTable } from '@/components/dashboard/cleaners-table';
import { Cleaner, CleanerStatus, StatusFilter } from '@/lib/types';
import { getCleaners, updateCleanerStatus } from '@/lib/api';
import { toast } from 'sonner';

export default function CleanersPage() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('All');
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCleaners();
  }, [selectedStatus, currentPage]);

  const loadCleaners = async () => {
    try {
      setIsLoading(true);
      const response = await getCleaners({
        page: currentPage,
        limit: 10,
        status: selectedStatus === 'All' ? undefined : selectedStatus,
      });
      setCleaners(response.data.data);
    } catch (error) {
      toast.error('Failed to load cleaners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (cleanerId: string, newStatus: CleanerStatus) => {
    try {
      await updateCleanerStatus({ cleanerId, status: newStatus });
      await loadCleaners();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Cleaners</h1>
        <div className="flex space-x-2">
          {(['All', 'Approved', 'Rejected', 'Pending'] as StatusFilter[]).map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              onClick={() => setSelectedStatus(status)}
              className={selectedStatus === status ? 'bg-blue-500 hover:bg-blue-600' : ''}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      <CleanersTable
        cleaners={cleaners}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />
    </div>
  );
}