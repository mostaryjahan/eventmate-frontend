import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllEvents } from "@/services/admin/eventManagement";
import { getAllUsers } from "@/services/admin/userManagement";
import { getAllHostApplications } from "@/services/admin/hostApplications";
import { IEvent } from "@/types/event.interface";
import { UserInfo } from "@/types/user.interface";
import { HostApplication } from "@/types/hostApplication.interface";

import {
  BarChart,
  CalendarArrowUp,
  DollarSign,
  User,
  Users,
  UserCheck,
} from "lucide-react";

const AdminDashboardPage = async () => {
  const [usersResult, eventsResult, hostApplicationsResult] = await Promise.all([
    getAllUsers(),
    getAllEvents(),
    getAllHostApplications(),
  ]);

  const allUsers: UserInfo[] = usersResult?.data || [];
  const users = allUsers.filter((user) => user.role !== "ADMIN");

  const events: IEvent[] = eventsResult?.data || [];
  const hostApplications: HostApplication[] = hostApplicationsResult?.success ? hostApplicationsResult.data || [] : [];
  const pendingApplications = hostApplications.filter(app => app.status === "PENDING");
  
  const totalRevenue = events.reduce(
    (acc, event) =>
      acc + parseFloat(event.joiningFee) * (event._count?.participants || 0),

    0
  );

  return (
    <div className="space-y-8">
      <h1 className="text-xl md:text-3xl font-semibold tracking-tight">
        Admin Overview
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>

            <Users className="h-5 w-5 text-blue-700" />
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>

            <p className="text-xs text-muted-foreground">
              All user roles included
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>

            <CalendarArrowUp className="h-5 w-5 text-primary" />
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>

            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>

            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>

            <p className="text-xs text-muted-foreground">
              From all paid events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>

            <BarChart className="h-5 w-5 text-orange-600" />
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">76%</div>

            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {users.length > 0 ? (
              users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center gap-4">
                  <User className="w-8 h-8 text-blue-600" />

                  <div>
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center gap-4">
                <CalendarArrowUp className="w-8 h-8 text-primary/80" />

                <div>
                  <p className="font-semibold">{event.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(event.dateTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Host Applications</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {pendingApplications.length > 0 ? (
              pendingApplications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center gap-4">
                  <UserCheck className="w-8 h-8 text-orange-600" />

                  <div>
                    <p className="font-semibold">{application.user.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {application.user.email}
                    </p>
                    <p className="text-xs text-orange-600">
                      Applied: {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending applications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
