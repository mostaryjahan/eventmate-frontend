import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllEvents } from "@/services/admin/eventManagement";
import { IEvent } from "@/types/event.interface";
import { EventCard } from "../event/EventCard";

const PopularEvents = async () => {
  const result = await getAllEvents();
  const events = result?.data || [];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-primary font-medium text-gray-900 mb-2">
            Popular Events Near You
          </h2>
          <p className="text-lg font-secondary text-gray-700 max-w-2xl mx-auto">
            Don&apos;t miss out on these trending events. Find your perfect
            match!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 6).map((event: IEvent) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link href="/events">
            <Button
              variant="outline"
              className="px-8 py-6 border-2 border-primary text-primary hover:border-[#a11f65] hover:text-[#a11f65] hover:bg-[#a11f65]/5 text-lg font-medium"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
