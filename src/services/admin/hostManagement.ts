/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// get all hosts
export const getAllHosts = async () => {
  try {
    const response = await serverFetch.get("/users");
    const result = await response.json();
    const hosts = result.filter((user: any) => user.role === "HOST");
    return hosts;
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

export const getAllHostApplications = async () => {
  const response = await serverFetch.get("/users/admin/host-applications");
  return await response.json();
};

export const approveHostApplication = async (userId: string) => {
  const response = await serverFetch.patch(
    `/users/admin/host-applications/${userId}/approve`
  );
  return await response.json();
};

export const rejectHostApplication = async (userId: string) => {
  const response = await serverFetch.patch(
    `/users/admin/host-applications/${userId}/reject`
  );
  return await response.json();
};
