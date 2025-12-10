import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const HostedEventsLoading = () => {
  return (
    <ManagementPageLoading
      columns={10}
      hasActionButton
      filterCount={5}
      filterWidths={["w-48", "w-32","w-36"]}
    />
  );
};

export default HostedEventsLoading;