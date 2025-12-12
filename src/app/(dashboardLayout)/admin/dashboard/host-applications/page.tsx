import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllHostApplications } from "@/services/admin/hostApplications";
import { HostApplication } from "@/types/hostApplication.interface";
import { HostApplicationActions } from "@/components/HostApplicationActions";
import { UserCheck, Clock, CheckCircle, XCircle, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HostApplicationsPage = async () => {
  const result = await getAllHostApplications();
  const applications: HostApplication[] = result?.data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline" className="text-orange-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "APPROVED":
        return <Badge variant="outline" className="text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "REJECTED":
        return <Badge variant="outline" className="text-red-600"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-semibold">Host Applications</h1>
        <div className="text-sm text-muted-foreground">
          Total: {applications.length} applications
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applications.length > 0 ? (
          applications.map((application) => (
            <Card key={application.id}>
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                   <Avatar className="hidden md:block h-10 w-10 border border-primary/40">
                      <AvatarImage src={application.user.image} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>    
                    <div>
                      <h3 className="font-semibold text-lg">{application.user.name}</h3>
                      <p className="text-muted-foreground">{application.user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Applied: {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:flex items-center gap-3">
                    {getStatusBadge(application.status)}
                    
                    <HostApplicationActions 
                      userId={application.userId} 
                      status={application.status} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No host applications found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HostApplicationsPage;