import { serverFetch } from "@/lib/server-fetch";

export const applyForHost = async () => {
    const response = await serverFetch.post("/users/apply-for-host");
    return await response.json();
};

export const checkHostApplicationStatus = async () => {
    const response = await serverFetch.get("/users/host-application-status");
    return await response.json();
};

export const cancelHostApplication = async () => {
    const response = await serverFetch.delete("/users/cancel-host-application");
    return await response.json();
};