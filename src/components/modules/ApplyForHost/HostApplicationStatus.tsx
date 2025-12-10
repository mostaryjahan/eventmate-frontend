/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { applyForHost } from "@/services/apply-for-host/applyForHost.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const HostApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const applied = localStorage.getItem('hostApplicationSubmitted');
    if (applied === 'true') {
      setHasApplied(true);
    }
  }, []);

  const handleBecomeHost = async () => {
    setLoading(true);
    try {
      await applyForHost();
      localStorage.setItem('hostApplicationSubmitted', 'true');
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

  if (hasApplied) {
    return (
      <Badge variant="outline" className="px-4 py-2 text-sm">
        Application Pending
      </Badge>
    );
  }

  return (
    <Button
      onClick={handleBecomeHost}
      disabled={loading}
      size="lg"
      className="w-full md:w-auto"
    >
      {loading ? "Processing..." : "Apply for Host"}
    </Button>
  );
};

export default HostApplicationStatus;
