"use client";

import PaymentSuccessContent from "@/components/modules/Payment/PaymentSuccessContent";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EventPageContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  if (paymentStatus === "success") {
    return <PaymentSuccessContent />;
  }

  return null;
}

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventPageContent />
    </Suspense>
  );
}
