'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Search } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import { getAllEvents } from '@/services/admin/eventManagement';
import { EventCard } from '../Home/EventCard';

const AllEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchType, setSearchType] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getAllEvents();
      setEvents(result?.data || []);
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchType) {
      filtered = filtered.filter(event => 
        event.type.name.toLowerCase().includes(searchType.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter(event => 
        event.dateTime.includes(searchDate)
      );
    }

    if (searchLocation) {
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    return filtered;
  }, [searchType, searchDate, searchLocation, events]);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Events</h1>
        
        {/* Search Filters */}
        <div className="mb-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Event Type / Category"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Date & Time"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event: IEvent) => (
           <EventCard key={event.id} event={event}/>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;