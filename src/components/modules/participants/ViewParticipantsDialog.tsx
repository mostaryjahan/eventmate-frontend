"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { getEventParticipants } from "@/services/host/hostedEventManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IParticipant } from "@/types/participants";
import { UserProfileDialog } from "./UserProfileDialog";
import { UserInfo } from "@/types/user.interface";

export const ViewParticipantsDialog = ({
  eventId,
  open,
  onOpenChange,
}: {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (open && eventId) {
      getEventParticipants(eventId).then((result) => {
        setParticipants(result?.data || []);
        setLoading(false);
      });
    }
  }, [open, eventId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Participants</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No participants yet
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((participant, index) => (
                  <TableRow key={`${participant.user.id}-${index}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.user.image} />
                          <AvatarFallback>
                            {participant.user.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        <span>
                          <button
                            className="bg-none hover:underline"
                            onClick={() => {
                              setSelectedUser(participant.user);
                              setProfileOpen(true);
                            }}
                          >
                            {participant.user.name}
                          </button>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{participant.user.email}</TableCell>
                    <TableCell>
                      {new Date(participant.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <button
                        className="bg-none hover:underline"
                        onClick={() => {
                          setSelectedUser(participant.user);
                          setProfileOpen(true);
                        }}
                      >
                        View Profile
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      {selectedUser && (
        <UserProfileDialog
          user={selectedUser}
          open={profileOpen}
          onOpenChange={setProfileOpen}
        />
      )}
    </Dialog>
  );
};
