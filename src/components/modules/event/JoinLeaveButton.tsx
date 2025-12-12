"use client";

import { Button } from "@/components/ui/button";
import { joinEvent, leaveEvent } from "@/services/event/event.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserMinus, UserPlus } from "lucide-react";
import { UserInfo } from "@/types/user.interface";

interface JoinLeaveButtonProps {
  eventId: string;
  participants: { user: { id: string } }[];
  eventStatus: string;
  maxParticipants?: number;
}

const JoinLeaveButton = ({ 
  eventId, 
  participants, 
  eventStatus, 
  maxParticipants 
}: JoinLeaveButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      const user = await getUserInfo();
      setUserInfo(user);
      
      if (user && participants) {
        setIsJoined(participants.some(p => p.user.id === user.id));
      }
    };
    checkUserStatus();
  }, [participants]);

  const handleJoinLeave = async () => {
    if (!userInfo) {
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }

    setLoading(true);
    try {
      const result = isJoined 
        ? await leaveEvent(eventId)
        : await joinEvent(eventId);

      if (result.success) {
        setIsJoined(!isJoined);
        toast.success(result.message || (isJoined ? "Left event successfully" : "Joined event successfully"));
        router.refresh();
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <Button onClick={handleJoinLeave} className="w-full">
        <UserPlus className="w-4 h-4 mr-2" />
        Login to Join
      </Button>
    );
  }

  if (eventStatus !== "OPEN") {
    return (
      <Button disabled className="w-full">
        Event {eventStatus.toLowerCase()}
      </Button>
    );
  }

  const isFull = maxParticipants && participants.length >= maxParticipants;

  if (!isJoined && isFull) {
    return (
      <Button disabled className="w-full">
        Event Full
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleJoinLeave} 
      disabled={loading}
      variant={isJoined ? "destructive" : "default"}
      className="w-full  cursor-pointer"
    >
      {loading ? (
        "Processing..."
      ) : isJoined ? (
        <>
          <UserMinus className="w-4 h-4 mr-2" />
          Leave Event
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          Join Event
        </>
      )}
    </Button>
  );
};

export default JoinLeaveButton;