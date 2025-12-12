"use client";

import { EventCard } from "@/components/modules/event/EventCard";
import { getSavedEvents } from "@/services/user/userEventManagement";
import { IEvent } from "@/types/event.interface";
import Link from "next/link";
import { useEffect, useState } from "react";

const SavedEventsPage = () => {
  const [savedEvents, setSavedEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const result = await getSavedEvents();
        console.log('Saved events result:', result);
        if (result?.success) {
          setSavedEvents(result.data || []);
        } else {
          console.error('Failed to fetch saved events:', result?.message);
          setSavedEvents([]);
        }
      } catch (error) {
        console.error('Error fetching saved events:', error);
        setSavedEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);

  const handleEventRemoved = (eventId: string) => {
    setSavedEvents(prev => prev.filter(event => event.id !== eventId));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-3xl font-semibold">Saved Events</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-56 rounded-t-lg"></div>
              <div className="bg-white p-4 rounded-b-lg">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold">Saved Events</h1>
        <p className="text-muted-foreground">{savedEvents.length} events saved</p>
      </div>

      {savedEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📌</div>
          <h3 className="text-xl font-semibold mb-2">No saved events yet</h3>
          <p className="text-muted-foreground mb-4">
            Start exploring events and save the ones you&apos;re interested in!
          </p>
          <Link
            href="/events"
            className="inline-flex items-center px-4 py-2 bg-[#a11f65] text-white rounded-md hover:bg-[#8a1a55] transition-colors"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedEvents.map((event) => (
            <div key={event.id}>
              <EventCard 
                event={{ ...event, isSaved: true }} 
                onSaveChange={(saved) => {
                  if (!saved) {
                    handleEventRemoved(event.id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedEventsPage;