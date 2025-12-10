import UserManagement from "@/components/modules/Dashboard/AdminDashboard/UserManagement";

const UserManagementPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl md:text-3xl font-semibold mb-6">
        User Management
      </h1>
      <UserManagement />
    </div>
  );
};

export default UserManagementPage;
