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
import { Calendar, MapPin, Users, Share2 } from "lucide-react";
import Link from "next/link";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";
import { BookNowButton } from "../Home/BookNowButton";
import { useState } from "react";
import { ViewParticipantsDialog } from "../participants/ViewParticipantsDialog";
import { SaveButton } from "./SaveButton";


export const EventCard = ({ event, onSaveChange }: { event: IEvent & { isSaved?: boolean }, onSaveChange?: (saved: boolean) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Check if event date has passed
  const isEventPassed = new Date(event.dateTime) < new Date();


  return (
    <>
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={event.image}
            alt={event.name}
            width={400}
            height={224}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-[#a11f65]/90 backdrop-blur-sm text-white border-none">
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
          <div className="absolute bottom-4 right-4">
            <Badge className="px-4 py-2 bg-white text-gray-900 text-lg font-bold border-none shadow-lg">
              {event.joiningFee}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold line-clamp-1">
                {event.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setDialogOpen(true)}
                  className="bg-none hover:underline hover:text-blue-500"
                >
                  {event._count?.participants || 0} Participants
                </button>
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <SaveButton eventId={event.id} isSaved={event.isSaved} onSaveChange={onSaveChange} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3 text-[#a11f65]" />
              <span className="font-medium">{event.dateTime}</span>
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
                    className="h-full bg-gradient-to-r from-[#a11f65] to-purple-600 rounded-full"
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
          </div>
        </CardContent>

        <CardFooter className="border-t gap-2">
          <Link href={`/events/${event.id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-[#a11f65] to-purple-600 hover:from-[#8a1a55] hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
              See Details
            </Button>
          </Link>
          <BookNowButton eventId={event.id} disabled={isEventPassed} />
        </CardFooter>
      </Card>

      <ViewParticipantsDialog
        eventId={event.id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
