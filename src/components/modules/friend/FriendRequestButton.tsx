"use client";

import { Button } from "@/components/ui/button";
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });

      if (res.ok) {
        toast.success("Friend request sent");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to send request");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSendRequest} disabled={loading} variant="outline">
      <UserPlus className="w-4 h-4 mr-2" />
      {loading ? "Sending..." : "Add Friend"}
    </Button>
  );
}
