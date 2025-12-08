import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/services/admin/eventManagement";
import { IEvent } from "@/types/event.interface";

const EventManagement = async () => {
  const result = await getAllEvents();
  const events = result?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
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
                 <TableCell className="font-medium">{event.creator.name}</TableCell>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{new Date(event.dateTime).toLocaleDateString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event._count?.participants || 0}</TableCell>
                  <TableCell>${event.joiningFee}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventManagement;