"use client";

import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

export const BookNowButton = ({ eventId, disabled = false }: { eventId: string; disabled?: boolean }) => {
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
      disabled={disabled}
      size="lg"
      className={`w-full shadow-md hover:shadow-lg transition-all px-5 cursor-pointer ${
        disabled 
          ? "bg-primary/90 cursor-not-allowed" 
          : "bg-primary hover:to-purple-700"
      } text-white`}
    >
      <Ticket className="w-4 h-4 mr-2" />
      {disabled ? "Event Passed" : "Book Now"}
    </Button>
  );
};
