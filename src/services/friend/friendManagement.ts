/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const getFriends = async () => {
  const response = await serverFetch.get("/friends");

  const data = await response.json();

  return { ok: response.ok, json: async () => data };
};

export const sendFriendRequests = async (
  _prevState: any,
  formData: FormData
) => {
  const friendId = formData.get("friendId");

  const response = await serverFetch.post("/friends/request", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ friendId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send friend request");
  }

  return response;
};

export const acceptFriendRequest = async (
  _prevState: any,
  formData: FormData
) => {
  const friendId = formData.get("friendId");

  const response = await serverFetch.post("/friends/accept", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ friendId }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("[acceptFriendRequest] Error:", error);
    throw new Error(error.message || "Failed to accept friend request");
  }
  return response;
};

// see friend req i send to others
export const getFriendRequests = async () => {
  console.log("[getFriendRequests] Fetching sent friend requests...");
  const response = await serverFetch.get("/friends/requests");
  console.log("[getFriendRequests] Response status:", response.status);
  const data = await response.json();
  console.log("[getFriendRequests] Response data:", data);
  return { ok: response.ok, json: async () => data };
};

export const RemoveFriends = async (friendId: string) => {

  const response = await serverFetch.delete(`/friends/${friendId}`);

  if (!response.ok) {
    const error = await response.json();
    console.error("[RemoveFriends] Error:", error);
    throw new Error(error.message || "Failed to remove friend");
  }

  const result = await response.json();
  console.log("[RemoveFriends] Success:", result);
  return response;
};



// get all friends events
export const getAllFriendsEvents = async () => {
  try {
    const response = await serverFetch.get("/friends/events");
    const data = await response.json();
    return { ok: response.ok, json: async () => data };
  } catch (error) {
    console.log(error);
  }
};

// get specific friend's participated events
export const getFriendsEvents = async (friendId: string) => {
  const response = await serverFetch.get(`/friends/${friendId}/events`);
  const data = await response.json();
  return { ok: response.ok, json: async () => data };
};