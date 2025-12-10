"use client";

import { EventCard } from "./EventCard";
import { IEvent } from "@/types/event.interface";
import { useState } from "react";

interface SavedEventCardProps {
  event: IEvent;
  onRemove?: (eventId: string) => void;
}

export const SavedEventCard = ({ event, onRemove }: SavedEventCardProps) => {
  const [isSaved, setIsSaved] = useState(true);

  const handleSaveChange = (saved: boolean) => {
    setIsSaved(saved);
    if (!saved && onRemove) {
      onRemove(event.id);
    }
  };

  if (!isSaved) {
    return null;
  }

  return (
    <div className="relative">
      <EventCard event={event} />
      <div className="absolute top-4 right-4 z-10">
        {/* SaveButton will be rendered inside EventCard */}
      </div>
    </div>
  );
};