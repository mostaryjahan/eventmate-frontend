import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { getHostReviews } from "@/services/review/review.service";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewsList } from "@/components/modules/review/ReviewsList";
import { FriendRequestButton } from "@/components/modules/friend/FriendRequestButton";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await serverFetch.get(`/users/${id}`);
  const result = await response.json();

  if (!result?.success || !result?.data) {
    notFound();
  }

  const user = result.data;
  const eventsResponse = await serverFetch.get(`/events?createdBy=${id}`);
  const eventsResult = await eventsResponse.json();
  const hostedEvents = eventsResult?.data || [];

  const reviewsResponse = await getHostReviews(id);
  const reviewsResult = await reviewsResponse.json();
  const reviews = reviewsResult?.data || [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
        reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.image} />
                <AvatarFallback className="text-4xl">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <Badge
                    variant={user.role === "HOST" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                  <FriendRequestButton userId={user.id} />
                </div>
                {avgRating > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating
                      rating={Math.round(avgRating)}
                      readonly
                      size={20}
                    />
                    <span className="text-sm text-muted-foreground">
                      ({avgRating.toFixed(1)} from {reviews.length} reviews)
                    </span>
                  </div>
                )}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {user.bio && <p className="mt-4 text-gray-700">{user.bio}</p>}
                {user.interests?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.interests.map((interest: string) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {user.role === "HOST" && hostedEvents.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hosted Events ({hostedEvents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {hostedEvents.map((event: { id: string; name: string; dateTime: string; location: string }) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.dateTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsList reviews={reviews} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
