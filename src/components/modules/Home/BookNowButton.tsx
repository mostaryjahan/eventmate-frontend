"use client";

import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

export const BookNowButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();

  const handleBookNow = async () => {
    const userInfo = await getUserInfo();
    
    if (userInfo) {
      router.push(`/book-event/${eventId}`);
    } else {
      router.push(`/login?redirect=/book-event/${eventId}`);
    }
  };

  return (
    <Button 
      onClick={handleBookNow}
      className="w-full bg-gradient-to-r from-[#a11f65] to-purple-600 hover:from-[#8a1a55] hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
    >
      <Ticket className="w-4 h-4 mr-2" />
      Book Now
    </Button>
  );
};
