import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";

const EventManagement = async() => {
 const result = await getHostedEvents();
  const events = result?.data || [];

    
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
                        <Image
                          src={event.image}
                          alt={event.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>
                        {new Date(event.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{event._count?.participants || 0}</TableCell>
                      <TableCell>${event.joiningFee}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
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