"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getAllHostApplications = async () => {
  const response = await serverFetch.get("/users/admin/host-applications");
  return await response.json();
};

export const approveHostApplication = async (userId: string) => {
  const response = await serverFetch.patch(`/users/admin/host-applications/${userId}/approve`);
  return await response.json();
};

export const rejectHostApplication = async (userId: string) => {
  const response = await serverFetch.patch(`/users/admin/host-applications/${userId}/reject`);
  return await response.json();
};