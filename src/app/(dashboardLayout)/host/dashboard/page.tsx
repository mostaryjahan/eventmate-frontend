import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import { CalendarIcon, DollarSignIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

const HostDashboardPage = async () => {
  const result = await getHostedEvents();
  const events: IEvent[] = result?.data || [];

  const upcomingEvents = events.filter(
    (e) => new Date(e.dateTime) > new Date()
  );
  const pastEvents = events.filter((e) => new Date(e.dateTime) <= new Date());
  const totalParticipants = events.reduce(
    (sum, e) => sum + (e._count?.participants || 0),
    0
  );
  const totalRevenue = events.reduce(
    (sum, e) => sum + (e._count?.participants || 0) * parseFloat(e.joiningFee),
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Host Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.dateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm">
                      {event._count?.participants || 0} participants
                    </div>
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
              <p className="text-muted-foreground">No past events</p>
            ) : (
              <div className="space-y-3">
                {pastEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.dateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm">
                      ${((event._count?.participants || 0) * parseFloat(event.joiningFee)).toFixed(2)}
                    </div>
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

export default HostDashboardPage;