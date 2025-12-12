/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Share2, Star } from "lucide-react";
import Link from "next/link";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";
import { BookNowButton } from "../Home/BookNowButton";
import { useState, useEffect } from "react";
import { ViewParticipantsDialog } from "../participants/ViewParticipantsDialog";
import { SaveButton } from "./SaveButton";
import { StarRating } from "@/components/ui/star-rating";
import { getEventReviews } from "@/services/review/review.service";

export const EventCard = ({
  event,
  onSaveChange,
}: {
  event: IEvent & { isSaved?: boolean };
  onSaveChange?: (saved: boolean) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const isEventPassed = new Date(event.dateTime) < new Date();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResult = await getEventReviews(event.id);
        const reviewsData = reviewsResult.ok ? await reviewsResult.json() : null;
        setReviews(reviewsData?.data || []);
      } catch (error) {
        setReviews([]);
        console.log(error)
      }
    };
    fetchReviews();
  }, [event.id]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        reviews.length
      : 0;

  return (
    <>
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-2">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className=" object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex justify-between gap-2">
            <Badge className="bg-blue-500/90 backdrop-blur-sm text-white border-none">
              {event.type.name}
            </Badge>
            <Badge
              className={`backdrop-blur-sm border-none ${
                isEventPassed
                  ? "bg-gray-600/90"
                  : event.status === "OPEN"
                  ? "bg-green-500/90"
                  : event.status === "FULL"
                  ? "bg-orange-500/90"
                  : event.status === "CANCELLED"
                  ? "bg-red-500/90"
                  : "bg-gray-500/90"
              } text-white`}
            >
              {isEventPassed ? "PASSED" : event.status}
            </Badge>
          </div>
          <div className="absolute bottom-1 right-2">
            <p className="text-2xl font-primary font-semibold text-yellow-500 ">
              ${event.joiningFee}
            </p>
          </div>
        </div>

        <CardHeader className="font-secondary -mt-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold line-clamp-1">
                {event.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setDialogOpen(true)}
                  className="bg-transparent hover:underline hover:text-blue-500"
                >
                  {event._count?.participants || 0} Participants
                </button>
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <SaveButton
                eventId={event.id}
                isSaved={event.isSaved}
                onSaveChange={onSaveChange}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-2 -mt-4">
          <div className="space-y-1">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3 text-[#a11f65]" />
              <span className="font-medium">
                {new Date(event.dateTime).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-3 text-[#a11f65]" />
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-3 text-[#a11f65]" />
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  min {event.minParticipants} to {event.maxParticipants} people
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#a11f65] to-purple-600 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        ((event._count?.participants || 0) /
                          event.maxParticipants) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* reviews */}
            <div>
              <div className="flex items-center text-gray-600">
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
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 w-full">
            <div className="w-1/2">
              <BookNowButton eventId={event.id} disabled={isEventPassed} />
            </div>
            <div className="w-1/2">
              <Link href={`/events/${event.id}`} className="">
                <Button
                  size="lg"
                  className="w-full bg-white hover:bg-primary/10 text-primary border-primary border shadow-md transition-all"
                >
                  See Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <ViewParticipantsDialog
        eventId={event.id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
