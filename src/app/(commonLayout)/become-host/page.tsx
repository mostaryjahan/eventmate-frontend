"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function BecomeHostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBecomeHost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: "HOST" }),
      });

      if (res.ok) {
        toast.success("You are now a host!");
        router.push("/host/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to become host");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Create and manage your own events",
    "Set your own pricing and schedules",
    "Build a community around your interests",
    "Earn money from event fees",
    "Get reviews and build your reputation",
    "Access to host dashboard and analytics",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Become a Host</h1>
          <p className="text-xl text-muted-foreground">
            Share your passion and create memorable experiences
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Host Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready to Get Started?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Upgrade your account to host status and start creating events today. 
              You'll get access to all host features immediately.
            </p>
            <Button 
              onClick={handleBecomeHost} 
              disabled={loading}
              size="lg"
              className="w-full md:w-auto"
            >
              {loading ? "Processing..." : "Become a Host Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
