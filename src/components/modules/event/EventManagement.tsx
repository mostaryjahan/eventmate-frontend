"use client";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getHostedEvents, updateHostedEvent } from "@/services/host/hostedEventManagement";
import { IEvent, IStatus } from "@/types/event.interface";
import Image from "next/image";
import { useState, useEffect } from "react";
import { EventActions } from "./EventActions";

const EventManagement = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  // Initial fetch of events
  useEffect(() => {
    getHostedEvents().then((result) => {
      setEvents(result?.data || []);
    });
  }, []);

  const handleStatusChange = async (eventId: string, newStatus: IStatus) => {
    const formData = new FormData();
    formData.append('status', newStatus);
    const result = await updateHostedEvent(eventId, formData);
    if (result.success) {
      setEvents(events.map(e => e.id === eventId ? { ...e, status: newStatus } : e));
    }
  };

  const handleEventDeleted = (deletedEventId: string) => {
    setEvents(events.filter(e => e.id !== deletedEventId));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event: IEvent) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={50}
                    height={50}
                    className="rounded-md w-12 h-12"
                  />
                </TableCell>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>
                  {new Date(event.dateTime).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.type.name}</TableCell>
                <TableCell>{event._count?.participants}</TableCell>
                <TableCell>${event.joiningFee}</TableCell>
                <TableCell>
                  <Select
                    value={event.status}
                    onValueChange={(value) => handleStatusChange(event.id, value as IStatus)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={IStatus.OPEN}>OPEN</SelectItem>
                      <SelectItem value={IStatus.FULL}>FULL</SelectItem>
                      <SelectItem value={IStatus.CANCELLED}>CANCELLED</SelectItem>
                      <SelectItem value={IStatus.COMPLETED}>COMPLETED</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <EventActions event={event} onEventDeleted={handleEventDeleted} userType="host" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventManagement;
