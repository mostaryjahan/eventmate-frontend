import { serverFetch } from "@/lib/server-fetch";

export const checkIfEventSaved = async (eventId: string): Promise<boolean> => {
  try {
    const response = await serverFetch.get(`/users/saved-events`);
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data.some((event: any) => event.id === eventId);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking saved event:', error);
    return false;
  }
};