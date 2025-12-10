"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/user.interface";
import { FriendRequestButton } from "../friend/FriendRequestButton";

export const UserProfileDialog = ({
  user,
  open,
  onOpenChange,
}: {
  user: UserInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border border-primary">
              <AvatarImage src={user.image} />
              <AvatarFallback className="text-2xl">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {user.bio && (
            <div>
              <h4 className="font-semibold mb-1">Bio</h4>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
          )}

          {user.location && (
            <div>
              <h4 className="font-semibold mb-1">Location</h4>
              <p className="text-sm text-muted-foreground">{user.location}</p>
            </div>
          )}

          {user.interests && user.interests.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-xs rounded-md"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <FriendRequestButton userId={user.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
