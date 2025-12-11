"use client";

import { Button } from "@/components/ui/button";
import { sendFriendRequests } from "@/services/friend/friendManagement";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FriendRequestButtonProps {
  userId: string;
}

export function FriendRequestButton({ userId }: FriendRequestButtonProps) {
  
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("friendId", userId);
      const res = await sendFriendRequests(null, formData);

      if (res.ok) {
        toast.success("Friend request sent");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to send request");
      }
    } catch (error) {
      toast.error("Please login first to send friend request");
      console.error("Error sending friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSendRequest} disabled={loading}>
      <UserPlus className="w-4 h-4 mr-2" />
      {loading ? "Sending..." : "Add Friend"}
    </Button>
  );
}
