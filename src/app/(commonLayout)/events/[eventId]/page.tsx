/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEventsById } from "@/services/admin/eventManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, User } from "lucide-react";
import Image from "next/image";
import { BookNowButton } from "@/components/modules/Home/BookNowButton";
import JoinLeaveButton from "@/components/modules/event/JoinLeaveButton";
import { getEventReviews } from "@/services/review/review.service";
import { ReviewsList } from "@/components/modules/review/ReviewsList";
import { StarRating } from "@/components/ui/star-rating";
import { ParticipantsList } from "@/components/modules/event/ParticipantsList";
import Link from "next/link";
import PaymentSuccessContent from "@/components/modules/Payment/PaymentSuccessContent";
import { Suspense } from "react";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const { eventId } = await params;
  const { payment } = await searchParams;
  
  // Handle payment success case
  if (payment === "success") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    );
  }

  const result = await getEventsById(eventId);
  const event = result.data;

  const reviewsResult = await getEventReviews(eventId);
  const reviewsData = reviewsResult.ok ? await reviewsResult.json() : null;
 
  const reviews = event.reviews || reviewsData?.data || [];

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        reviews.length
      : 0;

       const isEventPassed = new Date(event.dateTime) < new Date();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 text-secondary">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="relative h-96">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex gap-2 mb-3">
                <Badge className="bg-[#a11f65] text-white">
                  {event.type.name}
                </Badge>
                <Badge
                  className={`${
                    event.status === "OPEN"
                      ? "bg-green-500"
                      : event.status === "FULL"
                      ? "bg-orange-500"
                      : event.status === "CANCELLED"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  } text-white`}
                >
                  {event.status}
                </Badge>
              </div>
              <h1 className="text-3xl font-medium font-primary text-white mb-2">
                {event.name}
              </h1>
              <p className="text-white/90 flex items-center gap-2">
                <User className="w-4 h-4" />
                Hosted by {event.creator.name}
              </p>
            </div>
          </div>

          <CardContent className="p-8 -mt-6">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-[#a11f65]" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold">  {new Date(event.dateTime).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}</p>
                
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-[#a11f65]" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-[#a11f65]" />
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-semibold">
                    {event._count?.participants || 0} / {event.maxParticipants}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-[#a11f65]" />
                <div>
                  <p className="text-sm text-gray-600">Joining Fee</p>
                  <p className="font-semibold text-[#a11f65]">
                    {event.joiningFee}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold ">About This Event</h2>
              <p className="text-gray-700 leading-relaxed font-secondary">
                {event.description}
              </p>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Host</h3>
              <Link
                href={`/profile/${event.creator.id}`}
                className="flex items-center gap-3 hover:underline"
              >
                <User className="w-5 h-5" />
                <span>{event.creator.name}</span>
              </Link>
            </div>

            {event.participants && event.participants.length > 0 && (
              <div className="mb-8">
                <ParticipantsList participants={event.participants} />
              </div>
            )}

            <div className="flex justify-between gap-4 max-w-md">
              <BookNowButton eventId={event.id}  disabled={isEventPassed} />
              <JoinLeaveButton 
                eventId={event.id}
                participants={event.participants || []}
                eventStatus={event.status}
                maxParticipants={event.maxParticipants}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reviews ({reviews.length})</span>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={Math.round(avgRating)}
                    readonly
                    size={20}
                  />
                  <span className="text-sm text-muted-foreground">
                    ({avgRating.toFixed(1)})
                  </span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewsList reviews={reviews} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
