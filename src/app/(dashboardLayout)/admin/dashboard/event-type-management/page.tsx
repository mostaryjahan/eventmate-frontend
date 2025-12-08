import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllTypes } from "@/services/admin/eventTypeManagement";
import { EventTypeActions } from "./EventTypeActions";

interface EventType {
  id: string;
  name: string;
}

const EventTypeManagementPage = async () => {
  const result = await getAllTypes();
  const types: EventType[] = result?.data || [];

  return (
    <div className="p-6">
      <EventTypeActions />
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
  );
};

export default EventTypeManagementPage;