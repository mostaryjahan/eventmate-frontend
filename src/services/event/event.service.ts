/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const joinEvent = async (eventId: string) => {
  try {
    const response = await serverFetch.post(`/events/${eventId}/join`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to join event",
    };
  }
};

export const leaveEvent = async (eventId: string) => {
  try {
    const response = await serverFetch.delete(`/events/${eventId}/leave`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to leave event",
    };
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const response = await serverFetch.get(`/events/${eventId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch event",
    };
  }
};