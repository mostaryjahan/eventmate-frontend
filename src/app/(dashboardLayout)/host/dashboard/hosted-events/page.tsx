"use client";

import EventManagement from "@/components/modules/event/EventManagement";
import EventFormDialog from "@/components/modules/event/EventFormDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HostedEvents = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Event Management</h1>
        <Button onClick={() => setOpen(true)}>Create Event</Button>
      </div>

      <EventManagement key={refresh} />

      <EventFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setRefresh((prev) => prev + 1)}
      />
    </div>
  );
};

export default HostedEvents;
