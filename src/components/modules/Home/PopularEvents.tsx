"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Heart, Share2, Clock, Ticket } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    date: "July 15, 2024",
    time: "6:00 PM",
    location: "Central Park, NY",
    attendees: 1200,
    price: "$45",
    rating: 4.8,
    featured: true,
    spotsLeft: 24
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    date: "Aug 22, 2024",
    time: "9:00 AM",
    location: "Convention Center",
    attendees: 800,
    price: "$120",
    rating: 4.9,
    featured: true,
    spotsLeft: 15
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    date: "Sep 10, 2024",
    time: "4:00 PM",
    location: "Downtown Plaza",
    attendees: 650,
    price: "$35",
    rating: 4.7,
    featured: false,
    spotsLeft: 42
  },
  {
    id: 4,
    title: "Sunset Hiking Adventure",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    date: "July 28, 2024",
    time: "3:00 PM",
    location: "Blue Mountain Trail",
    attendees: 45,
    price: "Free",
    rating: 4.9,
    featured: false,
    spotsLeft: 8
  },
  {
    id: 5,
    title: "Art Gallery Opening",
    category: "Art",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    date: "Aug 5, 2024",
    time: "7:00 PM",
    location: "Modern Art Museum",
    attendees: 200,
    price: "$25",
    rating: 4.6,
    featured: true,
    spotsLeft: 32
  },
  {
    id: 6,
    title: "Board Game Night",
    category: "Social",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400&fit=crop",
    date: "July 20, 2024",
    time: "7:30 PM",
    location: "Game Haven Cafe",
    attendees: 30,
    price: "$12",
    rating: 4.8,
    featured: false,
    spotsLeft: 5
  }
];

const PopularEvents = () => {
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedEvents(prev => 
      prev.includes(id) 
        ? prev.filter(eventId => eventId !== id)
        : [...prev, id]
    );
  };

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
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {event.featured && (
                    <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none">
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-[#a11f65]/90 backdrop-blur-sm text-white border-none">
                    {event.category}
                  </Badge>
                </div>
                
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(event.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${likedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </button>
                
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="px-4 py-2 bg-white text-gray-900 text-lg font-bold border-none shadow-lg">
                    {event.price === "Free" ? "FREE" : event.price}
                  </Badge>
                </div>
              </div>
              
              {/* Card Content */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold line-clamp-1">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">{event.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{event.attendees} attending</span>
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
                      <span className="font-medium">{event.date}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <Clock className="w-3 h-3 inline mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-3 text-[#a11f65]" />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.spotsLeft} spots left</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#a11f65] to-purple-600 rounded-full"
                          style={{ width: `${Math.min(100, (event.spotsLeft / 50) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4 border-t">
                <Button 
                  className="w-full bg-gradient-to-r from-[#a11f65] to-purple-600 hover:from-[#8a1a55] hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  {event.price === "Free" ? "Join Event" : "Book Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-6 border-2 border-gray-300 text-gray-700 hover:border-[#a11f65] hover:text-[#a11f65] hover:bg-[#a11f65]/5 text-lg font-medium"
          >
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// ArrowRight icon component (add to imports if not already)
const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default PopularEvents;