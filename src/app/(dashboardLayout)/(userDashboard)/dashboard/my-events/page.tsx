import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyJoinedEvents } from "@/services/user/userEventManagement";
import { IEvent } from "@/types/event.interface";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReviewDialog } from "@/components/modules/review/ReviewDialog";

const MyEventPage = async () => {
  const result = await getMyJoinedEvents();
  console.log(result);
  const events: IEvent[] = result?.data || [];

  const upcomingEvents = events.filter(
    (e) => new Date(e.dateTime) > new Date()
  );
  const pastEvents = events.filter((e) => new Date(e.dateTime) <= new Date());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Events</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Upcoming Events ({upcomingEvents.length})
        </h2>
        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                No upcoming events.{" "}
                <Link href="/events" className="text-[#a11f65] hover:underline">
                  Explore events
                </Link>
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <Badge>{event.type.name}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.dateTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {event._count?.participants || 0}/
                        {event.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${event.joiningFee}</span>
                    </div>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="mt-4 inline-block text-sm text-[#a11f65] hover:underline"
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Past Events ({pastEvents.length})
        </h2>
        {pastEvents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No past events found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden opacity-80">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <Badge variant="secondary">{event.type.name}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.dateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <ReviewDialog eventId={event.id} hostId={event.createdBy} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventPage;
