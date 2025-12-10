import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { getAllEvents } from "@/services/admin/eventManagement";
import { IEvent } from "@/types/event.interface";
import { EventCard } from "./EventCard";



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
            <EventCard key={event.id} event={event} />
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