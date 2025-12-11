import ParticipantManagement from "@/components/modules/participants/ParticipantManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import { UsersIcon, CalendarIcon, TrendingUpIcon } from "lucide-react";

const ParticipantsManagementPage =async () => {

    const result = await getHostedEvents();
    const events: IEvent[] = result?.data || [];
  

    const totalParticipants = events.reduce(
      (sum, e) => sum + (e._count?.participants || 0),
      0
    );

    const totalEvents = events.length;
    const averageParticipantsPerEvent = totalEvents > 0 ? totalParticipants / totalEvents : 0;
    const activeEvents = events.filter((e): e is IEvent => 'eventDate' in e).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All of the Participants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEvents}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Participants/Event</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageParticipantsPerEvent.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>
      <ParticipantManagement/>
    </div>
  );
};

export default ParticipantsManagementPage;