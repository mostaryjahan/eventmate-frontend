'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket, Search } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import { getAllEvents } from '@/services/admin/eventManagement';
import Image from 'next/image';
import { BookNowButton } from '../Home/BookNowButton';
import Link from 'next/link';

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
            <Card key={event.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image src={event.image} alt={event.name} width={400} height={224} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#a11f65]/90 backdrop-blur-sm text-white border-none">{event.type.name}</Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="px-4 py-2 bg-white text-gray-900 text-lg font-bold border-none shadow-lg">{event.joiningFee}</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold line-clamp-1">{event.name}</CardTitle>
                <CardDescription>{event._count?.participants || 0} attending</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <span className="font-medium">{event.dateTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <span className="font-medium">min {event.minParticipants} to {event.maxParticipants} people</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t gap-2">
                 <Link href={`/event-details/${event.id}`} className="w-full">
                 <Button 
                  className="w-full bg-gradient-to-r from-[#a11f65] to-purple-600 hover:from-[#8a1a55] hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                 See Details
                </Button>
                 </Link>
                 <BookNowButton eventId={event.id} />
              </CardFooter>
            </Card>
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