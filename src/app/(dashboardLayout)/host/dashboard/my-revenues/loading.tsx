import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const MyRevenuesLoading = () => {
  return (
    <ManagementPageLoading
         columns={0}
         hasActionButton
         filterCount={5}
         filterWidths={["w-48","w-36"]}
       />
  );
};

export default MyRevenuesLoading;