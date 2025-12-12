import ApplyForHost from "@/components/modules/ApplyForHost/ApplyForHost";
import PageHeader from "@/components/shared/PageHeader";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import aboutBg from "../../../assets/home/img-3.jpg";

export default function BecomeHostPage() {
  const benefits = [
    "Create and manage your own events",
    "Set your own pricing and schedules",
    "Build a community around your interests",
    "Earn money from event fees",
    "Get reviews and build your reputation",
    "Access to host dashboard and analytics",
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <PageHeader
        title="Want to Become A Host?"
        path="Become a Host"
        bgImage={aboutBg.src}
      />
      <div className="container mx-auto px-4 max-w-4xl my-20">
        <h1 className="text-2xl font-primary font-medium mb-2">
          Start Hosting Your Own Events
        </h1>

        <p className="text-gray-700 font-secondary mb-8">
          Turn your ideas into real experiences. Create events, manage
          attendees, and grow your community using EventMate’s powerful hosting
          tools. Start building your presence and share what you love with the
          world.
        </p>

        <Card className="mb-8 font-secondary">
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

        <Card className="font-secondary mb-10">
          <CardHeader>
            <CardTitle>Ready to Get Started?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Upgrade your account to host status and start creating events
              today. You&apos;ll get access to all host features immediately.
            </p>
            <div className="flex justify-end">
              <ApplyForHost />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
