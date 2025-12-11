"use server";
import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createType = async (_prevState: any, formData: FormData) => {
  try {
    const data = { name: formData.get("name") };
    const response = await serverFetch.post("/event-types", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
};

export const getAllTypes = async () => {
  try {
    const response = await serverFetch.get("/event-types");
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
};

export const deleteType = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/event-types/${id}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
};

export const updateType = async (id: string, formData: FormData) => {
  try {
    const data = { name: formData.get("name") };
    const response = await serverFetch.put(`/event-types/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
};
