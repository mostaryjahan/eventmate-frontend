import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IEvent } from "@/types/event.interface";
import { ParticipantRow } from "./ParticipantRow";





const ParticipantManagement = async () => {
const result = await getHostedEvents();

const events = result?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Participants</h2>
      
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
              <TableCell colSpan={9} className="text-center">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event: IEvent) => (
              <ParticipantRow key={event.id} event={event} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

export default ParticipantManagement;
