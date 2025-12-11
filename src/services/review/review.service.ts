/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const createReview = async(_prevState: any, formData: FormData) =>{
   const response = await serverFetch.post("/reviews", { 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         eventId: formData.get("eventId"),
         rating: Number(formData.get("rating")),
         comment: formData.get("comment") || undefined
      })
   });
   if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create review");
   }
   return response;
}

export const getEventReviews = async (eventId: string) => {
  return await serverFetch.get(`/reviews/event/${eventId}`);
};

export const getAllReviews = async () => {
  return await serverFetch.get("/reviews");
};

export const getHostReviews = async (hostId: string) => {
  return await serverFetch.get(`/reviews/host/${hostId}`);
};
