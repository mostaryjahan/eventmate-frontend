"use client";

import { Button } from "@/components/ui/button";
import { initiatePayment } from "@/services/payment/payment.service";
import { CreditCard } from "lucide-react";

export const BookEventButton = ({ eventId }: { eventId: string }) => {
 

  const handlePayment = async () => {
    try {
      const result = await initiatePayment(eventId);
      console.log("Payment result:", result);
      if (result.success && result.data?.url) {
        const url = result.data.url.startsWith('http') 
          ? result.data.url 
          : `https://${result.data.url}`;
        window.location.href = url;
      } else {
        alert("Payment failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment error: " + error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="w-full bg-green-600 hover:bg-green-400 text-white cursor-pointer"
    >
      <CreditCard className="w-4 h-4 mr-2" />
      Proceed to Payment
    </Button>
  );
};
