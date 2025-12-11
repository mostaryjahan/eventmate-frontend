import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllFriendsEvents } from "@/services/friend/friendManagement";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

interface EventParticipant {
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

interface FriendEvent {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  creator: {
    id: string;
    name: string;
    image?: string;
  };
  type?: {
    id: string;
    name: string;
  };
  participants?: EventParticipant[];
  _count?: {
    participants: number;
  };
}

export default async function FriendsEventsPage() {
  try {
    const result = await getAllFriendsEvents();
    
    if (!result) {
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Friend&apos;s Events</h1>
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading friends events. Please refresh the page.</p>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    const data = await result.json();
    const events = data?.data || data?.events || data || [];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Friend&apos;s Events</h1>

      {events.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No events from friends yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event: FriendEvent) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {event.creator.name}</p>
                    {event.participants && event.participants.length > 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        {event.participants.map((p) => p.user.name).join(", ")} participated
                      </p>
                    )}
                  </div>
                  <Badge>{event.type?.name || "Event"}</Badge>
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
                  {event._count && (
                    <p className="text-xs text-muted-foreground">
                      {event._count.participants} participants
                    </p>
                  )}
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
  } catch (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Friend&apos;s Events</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">Error loading friends events. Please refresh the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
