import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const ParticipantsManagementLoading = () => {
  return (
    <ManagementPageLoading
         columns={8}
         hasActionButton
         filterCount={0}
         filterWidths={["w-48","w-36" ,"w-36", "w-36"]}
       />
  );
};

export default ParticipantsManagementLoading;