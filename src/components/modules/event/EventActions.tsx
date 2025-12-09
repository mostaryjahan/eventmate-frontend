"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteHostedEvent } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import { Pencil, Trash } from "lucide-react";
import EventFormDialog from "./EventFormDialog"; 
interface EventActionsProps {
  event: IEvent;
  onEventDeleted: (eventId: string) => void;
  onEventUpdated: () => void; 
}

export function EventActions({ event, onEventDeleted, onEventUpdated }: EventActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false); 

  const handleDeleteConfirm = async () => {
    const result = await deleteHostedEvent(event.id);
    if (result.success) {
      onEventDeleted(event.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => setIsFormDialogOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
        <Trash className="h-4 w-4" />
      </Button>
      <DeleteConfirmationDialog
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your event."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
      <EventFormDialog
        open={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSuccess={() => {
          onEventUpdated();
          setIsFormDialogOpen(false);
        }}
        event={event}
      />
    </div>
  );
}
