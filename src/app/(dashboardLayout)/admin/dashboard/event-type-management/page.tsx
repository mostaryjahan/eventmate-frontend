import { EventTypeActions } from "@/components/modules/Dashboard/AdminDashboard/EventTypeActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTypes } from "@/services/admin/eventTypeManagement";

import { EventType } from "@/types/event.interface";

const EventTypeManagementPage = async () => {
  const result = await getAllTypes();
  const types: EventType[] = result?.data || [];

  return (
    <div className=" md:px-6 py-6">
      <EventTypeActions />
      {/* table */}
      <div className="border rounded-md max-w-md mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.name}</TableCell>
                <TableCell className="space-x-2">
                  <EventTypeActions eventType={type} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventTypeManagementPage;
