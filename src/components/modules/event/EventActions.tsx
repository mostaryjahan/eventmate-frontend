'use client';

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/services/admin/eventManagement";
import { deleteHostedEvent } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import { useState } from "react";
import Link from "next/link";

interface EventActionsProps {
  event: IEvent;
  onEventDeleted: (eventId: string) => void;
  onEditEvent?: (event: IEvent) => void;
  userType?: 'admin' | 'host';
}

export const EventActions = ({ event, onEventDeleted, userType = 'host' }: EventActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      if (userType === 'admin') {
        await deleteEvent(event.id);
      } else {
        await deleteHostedEvent(event.id);
      }
      onEventDeleted(event.id);
    } catch (error) {
      console.error('Failed to delete event:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/events/edit/${event.id}`}>
            Edit
          </Link>
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => setShowDeleteDialog(true)}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
      
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Are you sure?"
        description="This action cannot be undone."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};