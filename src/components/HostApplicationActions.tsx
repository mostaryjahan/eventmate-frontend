"use client";

import { Button } from "@/components/ui/button";
import { approveHostApplication, rejectHostApplication } from "@/services/admin/hostApplications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HostApplicationActionsProps {
  userId: string;
  status: string;
}

export const HostApplicationActions = ({ userId, status }: HostApplicationActionsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveHostApplication(userId);
      router.refresh();
    } catch (error) {
      console.error("Error approving application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await rejectHostApplication(userId);
      router.refresh();
    } catch (error) {
      console.error("Error rejecting application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status !== "PENDING") return null;

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="text-green-600 border-green-600"
        onClick={handleApprove}
        disabled={loading}
      >
        Approve
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="text-red-600 border-red-600"
        onClick={handleReject}
        disabled={loading}
      >
        Reject
      </Button>
    </div>
  );
};