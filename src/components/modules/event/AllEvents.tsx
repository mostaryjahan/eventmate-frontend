"use client";

import { useState, useEffect } from "react";
import { IEvent } from "@/types/event.interface";
import { getAllEvents } from "@/services/admin/eventManagement";
import { EventCard } from "./EventCard";
import Filter from "../Home/Filter";
import PageHeader from "@/components/shared/PageHeader";
import bg from "../../../assets/home/img-1.jpg";


const AllEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getAllEvents();
      const eventsData = result?.data || [];
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen">
        <PageHeader 
        title="Our All Events" 
        path="Events" 
        bgImage={bg.src}
      />
      <div className="container mx-auto px-4">
       

        <div className="mb-8">
          <Filter events={events} onFilterChange={setFilteredEvents} />
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-20 mb-20">
          {filteredEvents.map((event: IEvent) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
