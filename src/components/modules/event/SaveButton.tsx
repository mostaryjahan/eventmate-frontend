"use client";

import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { saveEvent, unsaveEvent } from "@/services/user/userEventManagement";
import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SaveButtonProps {
  eventId: string;
  isSaved?: boolean;
  onSaveChange?: (saved: boolean) => void;
}

export const SaveButton = ({ eventId, isSaved = false, onSaveChange }: SaveButtonProps) => {
  const [saved, setSaved] = useState(isSaved);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Check user login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfo = await getUserInfo();
        setIsLoggedIn(!!userInfo);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);
  
  // Update saved state when isSaved prop changes
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSaveToggle = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to save events");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        const result = await unsaveEvent(eventId);
        if (result.success) {
          setSaved(false);
          onSaveChange?.(false);
          toast.success("Event removed from saved");
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await saveEvent(eventId);
        if (result.success) {
          setSaved(true);
          onSaveChange?.(true);
          toast.success("Event saved successfully");
        } else {
          toast.error(result.message || "Failed to save event");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 hover:text-[#a11f65]"
      onClick={handleSaveToggle}
      disabled={loading}
    >
      {saved ? (
        <Bookmark className="w-4 h-4 text-yellow-600 fill-yellow-600" />
      ) : (
        <Bookmark className="w-4 h-4 text-gray-400" />
      )}
    </Button>
  );
};