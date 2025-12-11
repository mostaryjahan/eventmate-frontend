"use client";

import EventManagement from "@/components/modules/event/EventManagement";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HostedEvents = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Event Management</h1>
        <Button asChild>
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>

      <EventManagement />
    </div>
  );
};

export default HostedEvents;
