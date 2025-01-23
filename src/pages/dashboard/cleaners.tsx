import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { CleanersTable } from '@/components/dashboard/cleaners-table';
import { Cleaner, CleanerStatus } from '@/lib/types';
import { getCleaners, updateCleanerStatus } from '@/lib/api';
import { toast } from 'sonner';

export default function CleanersPage() {
  // Define initial state with type
  const [selectedStatus, setSelectedStatus] = useState<'All' | CleanerStatus>('All');
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCleaners = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCleaners({
        page: 1,
        limit: 10,
        status: selectedStatus === 'All' ? undefined : selectedStatus,
      });
      setCleaners(response.data.data);
    } catch {
      toast.error('Failed to load cleaners');
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    loadCleaners();
  }, [loadCleaners]);
  const handleStatusChange = async (cleanerId: string, newStatus: CleanerStatus) => {
    try {
      await updateCleanerStatus({ cleanerId, status: newStatus });
      await loadCleaners();
      toast.success('Cleaner status updated successfully');
    } catch {
      toast.error('Failed to update cleaner status');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Cleaners</h1>
        <div className="flex space-x-2">
          {(['All', 'Approved', 'Rejected', 'Pending'] as const).map((status) => (
            <Button
              key={status} // Add key prop
              variant={selectedStatus === status ? 'default' : 'outline'}
              onClick={() => setSelectedStatus(status)}
              className={selectedStatus === status ? 'bg-blue-500 hover:bg-blue-600' : ''}
            >
              {status} {/* Render the string directly */}
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
