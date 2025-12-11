'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllEvents } from "@/services/admin/eventManagement";
import { IEvent } from "@/types/event.interface";
import { useEffect, useState } from "react";
import { EventActions } from "../../event/EventActions";
import EventFormDialog from "../../event/EventFormDialog";

const AdminEventManagement = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getAllEvents();
      setEvents(result?.data || []);
    };
    fetchEvents();
  }, []);

  const handleEventDeleted = (deletedEventId: string) => {
  
    setEvents(events.filter((e) => e.id !== deletedEventId));
  };

  const handleEventUpdated = () => {
    const fetchEvents = async () => {
      const result = await getAllEvents();
      setEvents(result?.data || []);
    };
    fetchEvents();
  };

  const handleEditEvent = (event: IEvent) => {
    setEditingEvent(event);
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Host Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event: IEvent) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {event.creator.name}
                  </TableCell>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>
                    {new Date(event.dateTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.type.name}</TableCell>
                  <TableCell>{event._count?.participants || 0}</TableCell>
                  <TableCell>${event.joiningFee}</TableCell>
                  <TableCell>
                    <EventActions
                      event={event}
                      onEventDeleted={handleEventDeleted}
                      onEditEvent={handleEditEvent}
                      userType="admin"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <EventFormDialog
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        onSuccess={handleEventUpdated}
        event={editingEvent || undefined}
      />
    </div>
  );
};

export default AdminEventManagement;
