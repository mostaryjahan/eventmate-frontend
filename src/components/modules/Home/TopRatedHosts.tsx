import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";

import Link from "next/link";
import { serverFetch } from "@/lib/server-fetch";

const TopRatedHosts = async () => {
  const result = await serverFetch.get("/users?role=HOST&limit=6");
  const hosts = result?.data || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Rated Hosts</h2>
          <p className="text-muted-foreground">Meet our most trusted event organizers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hosts.map((host: any) => (
            <Link key={host.id} href={`/profile/${host.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={host.image} />
                      <AvatarFallback className="text-2xl">{host.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-2">{host.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{host.location || "Location not set"}</p>
                    <StarRating rating={5} readonly size={18} />
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