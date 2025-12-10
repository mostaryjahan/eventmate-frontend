/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { applyForHost } from "@/services/apply-for-host/applyForHost.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";


const ApplyForHost = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = await getCookie("accessToken");
      if (accessToken) {
        try {
          const info = await getUserInfo();
          setUserInfo(info);
        } catch (error) {
          setUserInfo(null);
          console.log(error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const handleBecomeHost = async () => {
    if (!userInfo) {
      toast.error("Please login first to become a host");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      await applyForHost();
      toast.success("Successfully applied for host role");
    } catch (error: any) {
      toast.error(error.message || "Failed to apply for host");
    } finally {
      setLoading(false);
    }
  };
    return (
        <div>
            <Button 
              onClick={handleBecomeHost} 
              disabled={loading}
              size="lg"
              className="w-full md:w-auto"
            >
              {loading ? "Processing..." : "Become a Host Now"}
            </Button>
        </div>
    );
};

export default ApplyForHost;