"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteType } from "@/services/admin/eventTypeManagement";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { EventType } from "@/types/event.interface";
import { EventTypeDialog } from "./EventTypeDialog";



export function EventTypeActions({ eventType }: { eventType?: EventType }) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSuccess = () => {
    router.refresh();
  };

  const handleDelete = async () => {
    if (eventType) {
      await deleteType(eventType.id);
      router.refresh();
    }
  };

  if (!eventType) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-semibold">Event Type Management</h1>
        <EventTypeDialog onSuccess={handleSuccess} />
      </div>
    );
  }

  return (
    <>
      <EventTypeDialog eventType={eventType} onSuccess={handleSuccess} />
      <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        Delete
      </Button>
      <DeleteConfirmationDialog
        title="Are you sure?"
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
