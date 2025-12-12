"use client";

import AdminEventManagement from "@/components/modules/Dashboard/AdminDashboard/AdminEventManagement";
import EventFormDialog from "@/components/modules/event/EventFormDialog";
import { useState } from "react";

const EventManagement = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="px-2 md:px-6 py-6">
      <h1 className="text-xl md:text-3xl font-semibold mb-6">Event Management</h1>

      <AdminEventManagement key={refresh} />
      <EventFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setRefresh((prev) => prev + 1)}
      />
    </div>
  );
};

export default EventManagement;
