"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createType, updateType } from "@/services/admin/eventTypeManagement";

interface EventTypeDialogProps {
  eventType?: { id: string; name: string };
  onSuccess?: () => void;
}

export function EventTypeDialog({ eventType, onSuccess }: EventTypeDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(eventType?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);

    const result = eventType
      ? await updateType(eventType.id, formData)
      : await createType(null, formData);

    setLoading(false);

    if (result.success) {
      setOpen(false);
      setName("");
      onSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{eventType ? "Edit" : "Add Event Type"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{eventType ? "Edit Event Type" : "Create Event Type"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Event Type Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
