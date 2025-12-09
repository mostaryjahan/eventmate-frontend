"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends/requests`, { credentials: "include" }),
      ]);

      if (friendsRes.ok) {
        const data = await friendsRes.json();
        setFriends(data.data || []);
      }
      if (requestsRes.ok) {
        const data = await requestsRes.json();
        setRequests(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load friends");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (friendId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends/accept/${friendId}`, {
        method: "PUT",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Friend request accepted");
        fetchData();
      } else {
        toast.error("Failed to accept request");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRemove = async (friendId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends/${friendId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Friend removed");
        fetchData();
      } else {
        toast.error("Failed to remove friend");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Friends</h1>

      {requests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Friend Requests ({requests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((req: any) => (
                <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={req.user.image} />
                      <AvatarFallback>{req.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{req.user.name}</p>
                      <p className="text-sm text-muted-foreground">{req.user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleAccept(req.id)} size="sm">Accept</Button>
                    <Button onClick={() => handleRemove(req.id)} size="sm" variant="outline">Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Friends ({friends.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length === 0 ? (
            <p className="text-muted-foreground">No friends yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {friends.map((friend: any) => (
                <div key={friend.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <Link href={`/profile/${friend.friend.id}`} className="flex items-center gap-3 flex-1">
                    <Avatar>
                      <AvatarImage src={friend.friend.image} />
                      <AvatarFallback>{friend.friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{friend.friend.name}</p>
                      <p className="text-sm text-muted-foreground">{friend.friend.email}</p>
                    </div>
                  </Link>
                  <Button onClick={() => handleRemove(friend.id)} size="sm" variant="outline">Remove</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
