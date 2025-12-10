import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/user.interface";
import { getAllUsers } from "@/services/admin/userManagement";
import { Card } from "@/components/ui/card";

const UserManagement = async () => {
  const result = await getAllUsers();
  const allUsers = result?.data;

  const users = allUsers.filter(
    (user: UserInfo) => user.role !== "ADMIN" && user.role !== "HOST"
  );

  return (
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
  );
};

export default UserManagement;
