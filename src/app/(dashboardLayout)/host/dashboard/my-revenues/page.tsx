import HostRevenue from "@/components/modules/revenue/HostRevenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";
import { CalendarArrowDownIcon, DollarSignIcon, Users2 } from "lucide-react";

const MyRevenuesPage = async () => {
  const result = await getHostedEvents();
  const events: IEvent[] = result?.data || [];

  const totalRevenue = events.reduce(
    (sum, e) => sum + (e._count?.participants || 0) * parseFloat(e.joiningFee),
    0
  );

  const totalEvents = events.length;
  const totalParticipants = events.reduce((sum, e) => sum + (e._count?.participants || 0), 0);
  const averageRevenuePerEvent = totalEvents > 0 ? totalRevenue / totalEvents : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All of my revenue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarArrowDownIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/Event</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageRevenuePerEvent.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* line chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <HostRevenue/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyRevenuesPage;
