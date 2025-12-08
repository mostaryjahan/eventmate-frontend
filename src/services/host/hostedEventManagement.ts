/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// create events
export const createEvent = async (_prevState: any, formData: FormData) => {
  try {
    const uploadFormData = new FormData();
    const data: any = {};

    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.post("/events", {
      body: uploadFormData,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create event",
      };
    }

    return {
      success: true,
      message: result?.message || "Event created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

// get all of my hosted events
export const getHostedEvents = async () => {
  try {
    const response = await serverFetch.get("/events/my-events");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

// get my own hosted event by Id
export const getHostedEventById = async (eventId: string) => {
  try {
    const response = await serverFetch.get(`/events/${eventId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

// update my hosted event
export const updateHostedEvent = async (eventId: string, data: any) => {
  try {
    const response = await serverFetch.patch(`/events/${eventId}`, {
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

// delete my hosted event
export const deleteHostedEvent = async (eventId: string) => {
  try {
    const response = await serverFetch.delete(`/events/${eventId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

