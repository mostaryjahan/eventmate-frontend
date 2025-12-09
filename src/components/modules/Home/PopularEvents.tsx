

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Heart, Share2, Clock, Ticket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllEvents } from "@/services/admin/eventManagement";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";
import { BookNowButton } from "./BookNowButton";



const PopularEvents = async () => {
const result = await getAllEvents();
 const events = result?.data || [];


  

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1.5 bg-[#a11f65] hover:bg-[#8a1a55] text-white border-none">
            <Star className="w-3 h-3 mr-1" />
            Trending Now
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Events Near You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on these trending events. Find your perfect match!
          </p>
        </div>
        
        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 6).map((event: IEvent) => (
            <Card 
              key={event.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.name}
                  width={400}
                  height={224}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-[#a11f65]/90 backdrop-blur-sm text-white border-none">
                    {event.type.name}
                  </Badge>
                  <Badge className={`backdrop-blur-sm border-none ${
                    event.status === 'OPEN' ? 'bg-green-500/90' :
                    event.status === 'FULL' ? 'bg-orange-500/90' :
                    event.status === 'CANCELLED' ? 'bg-red-500/90' :
                    'bg-gray-500/90'
                  } text-white`}>
                    {event.status}
                  </Badge>
                </div>
             
                
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="px-4 py-2 bg-white text-gray-900 text-lg font-bold border-none shadow-lg">
                    {event.joiningFee}
                  </Badge>
                </div>
              </div>
              
              {/* Card Content */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold line-clamp-1">
                      {event.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <span className="text-gray-600">{event._count?.participants || 0} attending</span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-[#a11f65]"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <div>
                      <span className="font-medium">{event.dateTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">min {event.minParticipants} to {event.maxParticipants} people</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#a11f65] to-purple-600 rounded-full"
                          style={{ width: `${Math.min(100, ((event._count?.participants || 0) / event.maxParticipants) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className=" border-t gap-2">
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
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <Link href="/all-events">
            <Button 
              variant="outline" 
              className="px-8 py-6 border-2 border-gray-300 text-gray-700 hover:border-[#a11f65] hover:text-[#a11f65] hover:bg-[#a11f65]/5 text-lg font-medium"
            >
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;