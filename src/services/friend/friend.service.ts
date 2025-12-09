import { serverFetch } from "@/lib/server-fetch";

export const getFriends = async () => {
  return await serverFetch("/friends");
};

export const getFriendRequests = async () => {
  return await serverFetch("/friends/requests");
};

export const getFriendsEvents = async () => {
  return await serverFetch("/friends/events");
};
