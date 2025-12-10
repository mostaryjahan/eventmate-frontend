"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";
import { useState } from "react";
import { ViewParticipantsDialog } from "./ViewParticipantsDialog";

export const ParticipantRow = ({ event }: { event: IEvent }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <Image
            src={event.image}
            alt={event.name}
            width={50}
            height={50}
            className="rounded-md w-12 h-12"
          />
        </TableCell>
        <TableCell className="font-medium">{event.name}</TableCell>
        <TableCell>{new Date(event.dateTime).toLocaleDateString()}</TableCell>
        <TableCell>{event.location}</TableCell>
        <TableCell>{event.type.name}</TableCell>
        <TableCell>{event._count?.participants}</TableCell>
        <TableCell>${event.joiningFee}</TableCell>
        <TableCell>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-none text-primary font-semibold hover:underline"
          >
            View Participants
          </button>
        </TableCell>
      </TableRow>
      <ViewParticipantsDialog
        eventId={event.id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
