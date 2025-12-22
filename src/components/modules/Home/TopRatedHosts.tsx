/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";

import Link from "next/link";
import { getAllUsers } from "@/services/admin/userManagement";
import { UserInfo } from "@/types/user.interface";

const TopRatedHosts = async () => {
  let hosts = [];
  
  try {
    const result = await getAllUsers();
    const hostData = result?.data || [];
  
    if (Array.isArray(hostData)) {
      hosts = hostData.filter(
        (user: UserInfo) => user.role === "HOST"
      );
    }
 
  } catch (error) {
    console.error("Failed to fetch hosts:", error);
  }

  

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-primary font-medium mb-3">Top Rated Hosts</h2>
          <p className="text-gray-600 font-secondary">Meet our most trusted event organizers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hosts.slice(0, 4).map((host: any) => (
            <Link key={host.id} href={`/profile/${host.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer font-secondary">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={host.image} />
                      <AvatarFallback className="text-2xl">{host.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-2">{host.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{host.location || "Location not set"}</p>
                    <StarRating rating={host.rating || 5} readonly size={18} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedHosts;