import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cleaner } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star, Phone, Mail, MapPin, Briefcase, Calendar, Eye, Power } from 'lucide-react';
import { toast } from 'sonner';

interface CleanersTableProps {
  cleaners: Cleaner[];
  activeTable?: boolean;
  onStatusChange?: (cleanerId: string, status: 'Approved' | 'Rejected') => void;
  onEnableStateChange?: (cleanerId: string, isEnabled: boolean) => void;
  isLoading?: boolean;
}

export function CleanersTable({
  cleaners,
  activeTable = false,
  onStatusChange,
  onEnableStateChange,
  isLoading = false,
}: CleanersTableProps) {
  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnabledStatusColor = (isEnabled: boolean) => {
    return isEnabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  };

  const handleAction = async (cleaner: Cleaner, action: string) => {
    try {
      if (action === 'approve' || action === 'reject') {
        await onStatusChange?.(cleaner.id, action === 'approve' ? 'Approved' : 'Rejected');
        toast.success(`Cleaner ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      } else if (action === 'enable' || action === 'disable') {
        await onEnableStateChange?.(cleaner.id, action === 'enable');
        toast.success(`Cleaner ${action === 'enable' ? 'enabled' : 'disabled'} successfully`);
      }
    } catch (error) {
      toast.error('Failed to update cleaner status');
    }
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              {!activeTable && <TableHead>Actions</TableHead>}
              {activeTable && <TableHead>Enable/Disable</TableHead>}
              <TableHead className="text-right">View Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cleaners.map((cleaner) => (
              <TableRow key={cleaner.id}>
                <TableCell className="font-medium">{cleaner.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={cleaner.profileImage} />
                      <AvatarFallback>{cleaner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{cleaner.name}</span>
                  </div>
                </TableCell>
                <TableCell>{cleaner.email}</TableCell>
                <TableCell>{cleaner.phoneNumber}</TableCell>
                <TableCell>{cleaner.dateTime}</TableCell>
                <TableCell>
                  <Badge className={cn('rounded-full', getStatusColor(cleaner.status))}>
                    {cleaner.status}
                  </Badge>
                </TableCell>
                {!activeTable && (
                  <TableCell>
                    <div className="space-x-2">
                      {cleaner.status !== 'Approved' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleAction(cleaner, 'approve')}
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleAction(cleaner, 'reject')}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                )}
                {activeTable && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cleaner.isEnabled ? 'text-red-600' : 'text-green-600'}
                      onClick={() => handleAction(cleaner, cleaner.isEnabled ? 'disable' : 'enable')}
                    >
                      {cleaner.isEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCleaner(cleaner)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedCleaner} onOpenChange={() => setSelectedCleaner(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cleaner Profile</DialogTitle>
          </DialogHeader>
          {selectedCleaner && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedCleaner.profileImage} />
                  <AvatarFallback>{selectedCleaner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{selectedCleaner.name}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge className={cn('rounded-full', getStatusColor(selectedCleaner.status))}>
                      {selectedCleaner.status}
                    </Badge>
                    {selectedCleaner.status === 'Approved' && (
                      <Badge className={cn('rounded-full', getEnabledStatusColor(selectedCleaner.isEnabled))}>
                        {selectedCleaner.isEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href={`mailto:${selectedCleaner.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {selectedCleaner.email}
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleCopyToClipboard(selectedCleaner.phoneNumber, 'Phone number')}
                  >
                    {selectedCleaner.phoneNumber}
                  </button>
                </div>

                {selectedCleaner.address && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedCleaner.address}</span>
                  </div>
                )}

                {selectedCleaner.rating && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{selectedCleaner.rating} / 5.0</span>
                  </div>
                )}

                {selectedCleaner.totalJobs && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>{selectedCleaner.totalJobs} jobs completed</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {selectedCleaner.joinedDate}</span>
                </div>

                {selectedCleaner.status === 'Approved' && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Power className="h-4 w-4 text-gray-500" />
                    <span>Account {selectedCleaner.isEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}