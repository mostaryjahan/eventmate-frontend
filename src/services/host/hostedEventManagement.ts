/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// create events
export const createEvent = async (_prevState: any, formData: FormData) => {
  try {
    const uploadFormData = new FormData();
    const data: any = {};

    formData.forEach((value, key) => {
      if (key !== "image" && value) {
        if (key === "minParticipants" || key === "maxParticipants") {
          data[key] = parseInt(value as string, 10);
        } else if (key === "joiningFee") {
          data[key] = parseFloat(value as string);
        } else if (key === "dateTime") {
          data[key] = new Date(value as string).toISOString();
        } else {
          data[key] = value;
        }
      }
    });

    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("image");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("image", file);
    }

    console.log("Data being sent to backend:", data);

    const response = await serverFetch.post("/events", {
      body: uploadFormData,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Backend error response:", result);
      return {
        success: false,
        message: result?.message || "Failed to create event",
        errors: result?.errors || result?.errorDetails,
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
export const updateHostedEvent = async (eventId: string, formData: FormData) => {
  try {
    const uploadFormData = new FormData();
    const data: any = {};

    formData.forEach((value, key) => {
      if (key !== "image" && value) {
        if (key === "minParticipants" || key === "maxParticipants") {
          data[key] = parseInt(value as string, 10);
        } else if (key === "joiningFee") {
          data[key] = parseFloat(value as string);
        } else if (key === "dateTime") {
          data[key] = new Date(value as string).toISOString();
        } else {
          data[key] = value;
        }
      }
    });

    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("image");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("image", file);
    }

    console.log("Update data being sent:", data);

    const response = await serverFetch.patch(`/events/${eventId}`, {
      body: uploadFormData,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Backend error response:", result);
      return {
        success: false,
        message: result?.message || "Failed to update event",
        errors: result?.errors || result?.errorDetails,
      };
    }

    return {
      success: true,
      message: result?.message || "Event updated successfully",
    };
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

// get participants for a specific event
export const getEventParticipants = async (eventId: string) => {
  try {
    const response = await serverFetch.get(`/events/${eventId}/participants`);
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
