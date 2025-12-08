/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAllEvents = async () => {
  try {
    const response = await serverFetch.get("/events");
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

export const getEventsById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/events/${id}`);
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

export const updateEvent = async (id: string, formData: FormData) => {
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

    const response = await serverFetch.patch(`/events/${id}`, {
      body: formData,
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

export const deleteEvent = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/events/${id}`);
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
