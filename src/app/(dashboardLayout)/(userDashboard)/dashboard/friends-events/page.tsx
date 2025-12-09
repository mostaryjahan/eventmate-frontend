import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFriendsEvents } from "@/services/friend/friend.service";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default async function FriendsEventsPage() {
  const result = await getFriendsEvents();
  const events = result?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Friends' Events</h1>

      {events.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No events from friends yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event: any) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {event.creator.name}</p>
                  </div>
                  <Badge>{event.type.name}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Link 
                  href={`/event-details/${event.id}`}
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
  );
}
