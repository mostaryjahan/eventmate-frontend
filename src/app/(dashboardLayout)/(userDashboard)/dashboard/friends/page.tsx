"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  getFriends,
  acceptFriendRequest,
  RemoveFriends,
} from "@/services/friend/friendManagement";

interface IFriend {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface ISentRequest {
  id: string;
  friendId?: string;
  receiverId?: string;
  receiver?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  friend?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export default function FriendsPage() {
  const [requests, setRequests] = useState<IFriend[]>([]);
  const [sentRequests, setSentRequests] = useState<ISentRequest[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getFriends();
        const data = await res.json();
        console.log("[Frontend] getFriends data:", data);
        
        setRequests(data.data?.requests || []);
        setFriends(data.data?.friends || []);
        setSentRequests(data.data?.sentRequests || []);
      } catch (error) {
        toast.error("Failed to fetch friends");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await RemoveFriends(id);
      setFriends(friends.filter((f: IFriend) => f.id !== id));
      setRequests(requests.filter((r: IFriend) => r.id !== id));
      toast.success("Removed successfully");
    } catch (error) {
      toast.error("Failed to remove");
      console.log(error);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("friendId", id);
      await acceptFriendRequest(null, formData);
      const updatedRequests = requests.filter((r: IFriend) => r.id !== id);
      setRequests(updatedRequests);
      
      toast.success("Friend request accepted");
      const res = await getFriends();
      if (res.ok) {
        const data = await res.json();
        setFriends(data.data?.friends || []);
      }
    } catch (error) {
      toast.error("Failed to accept request");
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Friends</h1>

      {sentRequests?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sent Requests({sentRequests?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentRequests.map((req) => {
                const user = req.receiver || req.friend;
                return (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.image} />
                        <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user?.name || "Unknown"}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email || "No email"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {requests?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Friend Requests ({requests?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((req: IFriend) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={req.image} />
                      <AvatarFallback>{req.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{req.name || "not"}</p>
                      <p className="text-sm text-muted-foreground">
                        {req.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleAccept(req.id)} size="sm">
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleRemove(req.id)}
                      size="sm"
                      variant="outline"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Friends ({friends?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {friends?.length === 0 ? (
            <p className="text-muted-foreground">No friends yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {friends.map((friend: IFriend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <Link
                    href={`/profile/${friend.id}`}
                    className="flex items-center gap-3 flex-1"
                  >
                    <Avatar>
                      <AvatarImage src={friend.image} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.email}
                      </p>
                    </div>
                  </Link>
                  <Button
                    onClick={() => handleRemove(friend.id)}
                    size="sm"
                    variant="outline"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
