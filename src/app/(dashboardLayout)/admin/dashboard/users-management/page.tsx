import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/services/admin/userManagement";
import { UserInfo } from "@/types/user.interface";
import { Card } from "@/components/ui/card";

const UserManagementPage = async () => {
  const result = await getAllUsers();
  const users = Array.isArray(result?.data?.data) ? result.data.data : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user: UserInfo, index: number) => (
          <Card key={index} className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.role}</p>
            <Button className="mt-2">Edit</Button>
             <Button className="mt-2">Delete</Button>
          </Card>
        ))}
      
      </div>
    </div>
  );
};

export default UserManagementPage;
