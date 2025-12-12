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
    const hostData = result || [];
    
    // Ensure hostData is an array before filtering
    if (Array.isArray(hostData)) {
      hosts = hostData.filter(
        (user: UserInfo) => user.role === "HOST"
      );
    }
    
    console.log(hosts);
  } catch (error) {
    console.error("Failed to fetch hosts:", error);
  }

  // Fallback data if API fails or returns empty
  if (hosts.length === 0) {
    hosts = [
      {
        id: 1,
        name: "Sarah Johnson",
        location: "Dhaka, Bangladesh",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      {
        id: 2,
        name: "Michael Chen",
        location: "Dhaka, Bangladesh",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.8
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        location: "Dhaka, Bangladesh",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5
      }
    ];
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-primary font-medium mb-3">Top Rated Hosts</h2>
          <p className="text-gray-600 font-secondary">Meet our most trusted event organizers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hosts.map((host: any) => (
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