import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyEvents, getSavedEvents } from "@/services/user/userEventManagement";
import { IEvent } from "@/types/event.interface";
import { CalendarIcon, CheckCircle, ClockIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { ReviewDialog } from "@/components/modules/review/ReviewDialog";
import HostApplicationStatus from "@/components/modules/ApplyForHost/HostApplicationStatus";

const UserDashboardPage = async () => {
  const result = await getMyEvents();
  const savedResult = await getSavedEvents();
  const events: IEvent[] = result?.data || [];
  const savedEvents: IEvent[] = savedResult?.data || [];

  const upcomingEvents = events.filter(
    (e) => new Date(e.dateTime) > new Date()
  );
  const pastEvents = events.filter((e) => new Date(e.dateTime) <= new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-semibold">My Dashboard</h1>
        <HostApplicationStatus />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Joined Events
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Events
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pastEvents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Events
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedEvents.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground">
                No upcoming events.{" "}
                <Link href="/events" className="text-[#a11f65] hover:underline">
                  Explore events
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.dateTime).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-sm text-[#a11f65] hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Events</CardTitle>
          </CardHeader>
          <CardContent>
            {pastEvents.length === 0 ? (
              <p className="text-muted-foreground">No past events found.</p>
            ) : (
              <div className="space-y-4">
                {pastEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.dateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <ReviewDialog eventId={event.id} hostId={event.createdBy} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardPage;
