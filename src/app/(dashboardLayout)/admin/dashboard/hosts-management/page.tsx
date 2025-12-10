import HostManagement from "@/components/modules/Dashboard/AdminDashboard/HostManagement";

const HostManagementPage = () => {
  return (
   <div className="p-6">
      <h1 className="text-xl md:text-3xl font-semibold mb-6">
        Host Management
      </h1>
      <HostManagement/>
    </div>
  );
};

export default HostManagementPage;