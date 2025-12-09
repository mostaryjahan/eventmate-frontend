import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyEvents } from "@/services/user/userEventManagement";
import { Mail, MapPin, Calendar, Award } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const MyProfilePage = async () => {
  const user = await getUserInfo();
  
  if (!user) {
    redirect("/login");
  }

  const result = await getMyEvents();
  const events = result?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={user.image} />
                <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <Badge className="mb-4">{user.role}</Badge>
              
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
              </div>

              <Link href="/my-profile" className="w-full mt-6">
                <Button className="w-full">Edit Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {user.bio || "No bio added yet."}
            </p>
            
            {user.interests && user.interests.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, idx) => (
                    <Badge key={idx} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter((e: any) => new Date(e.dateTime) > new Date()).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter((e: any) => new Date(e.dateTime) <= new Date()).length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfilePage;