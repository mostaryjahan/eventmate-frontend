"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllUsers, updateUsers } from "@/services/admin/userManagement";
import { getAllEvents } from "@/services/admin/eventManagement";
import { UserInfo } from "@/types/user.interface";
import { IEvent } from "@/types/event.interface";
import { UserRole } from "@/lib/auth-utils";
import { Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";

const HostManagement = () => {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResult, eventResult] = await Promise.all([
          getAllUsers(),
          getAllEvents()
        ]);
        setAllUsers(userResult?.data || []);
        setAllEvents(eventResult?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const hosts = allUsers.filter(
    (user: UserInfo) => user.role === "HOST"
  );

  // Group events by creator ID
  const eventsByHost = allEvents.reduce((acc: Record<string, IEvent[]>, event: IEvent) => {
    if (!acc[event.createdBy]) {
      acc[event.createdBy] = [];
    }
    acc[event.createdBy].push(event);
    return acc;
  }, {});

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const result = await updateUsers(userId, { role: newRole });
      
      if (result?.success) {
        setAllUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, role: newRole as UserRole } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

 

  return (
    <div className="space-y-4 rounded-md border max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Events Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hosts.map((host: UserInfo) => {
            const hostEvents = eventsByHost[host.id] || [];
            return (
              <TableRow key={host.id}>
                <TableCell className="font-medium">{host.name}</TableCell>
                <TableCell>{host.email}</TableCell>
                <TableCell>
                  <Select
                    value={host.role}
                    onValueChange={(value) => handleRoleChange(host.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="HOST">HOST</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{hostEvents.length} events</div>
                    {hostEvents.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {hostEvents.slice(0, 2).map((event: IEvent) => (
                          <div key={event.id}>{event.name}</div>
                        ))}
                        {hostEvents.length > 2 && (
                          <div>+{hostEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive"><Trash2Icon/></Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default HostManagement;
