/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { applyForHost, checkHostApplicationStatus, cancelHostApplication } from "@/services/apply-for-host/applyForHost.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const HostApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await checkHostApplicationStatus();
        setHasApplied(response.data?.hasApplied || false);
      } catch (error) {
        console.error('Failed to check host application status:', error);
      }
    };
    checkStatus();
  }, []);

  const handleBecomeHost = async () => {
    setLoading(true);
    try {
      await applyForHost();
    
      toast.success(
        "Host application submitted successfully. Please wait for admin approval."
      );
      setHasApplied(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to apply for host");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    setCanceling(true);
    try {
      await cancelHostApplication();
      toast.success("Host application cancelled successfully.");
      setHasApplied(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel application");
    } finally {
      setCanceling(false);
    }
  };

  if (hasApplied) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="px-4 py-2 text-sm">
          Application Pending
        </Badge>
        <Button
          onClick={handleCancelRequest}
          disabled={canceling}
          variant="destructive"
          size="sm"
        >
          {canceling ? "Canceling..." : "Cancel Request"}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleBecomeHost}
      disabled={loading}
      size="lg"
      className="w-auto cursor-pointer"
    >
      {loading ? "Processing..." : "Apply for Host"}
    </Button>
  );
};

export default HostApplicationStatus;
