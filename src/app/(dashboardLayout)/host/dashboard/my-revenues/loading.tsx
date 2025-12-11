import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const MyRevenuesLoading = () => {
  return (
    <ManagementPageLoading
         columns={4}
         hasActionButton
         filterCount={3}
         filterWidths={[]}
       />
  );
};

export default MyRevenuesLoading;