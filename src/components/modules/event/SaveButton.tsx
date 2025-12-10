"use client";

import { Button } from "@/components/ui/button";
import { saveEvent, unsaveEvent } from "@/services/user/userEventManagement";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SaveButtonProps {
  eventId: string;
  isSaved?: boolean;
  onSaveChange?: (saved: boolean) => void;
}

export const SaveButton = ({ eventId, isSaved = false, onSaveChange }: SaveButtonProps) => {
  const [saved, setSaved] = useState(isSaved);
  
  // Update saved state when isSaved prop changes
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);
  const [loading, setLoading] = useState(false);

  const handleSaveToggle = async () => {
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
          toast.error("Please login to save events");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-gray-500 hover:text-[#a11f65]"
      onClick={handleSaveToggle}
      disabled={loading}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4 fill-current" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </Button>
  );
};