"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonial() {
  const reviews = [
    {
      id: 1,
      name: "Scarlett Eleanor",
      role: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "EventMate made our marketing workshop smooth and stress-free. The platform is easy to use, and helped us connect with participants instantly.",
    },
    {
      id: 2,
      name: "Daniel Carter",
      role: "Event Organizer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "Hosting events has never been easier. The tools, dashboard, and support team made our conference a huge success. Highly recommended!",
    },
    {
      id: 3,
      name: "Ariana Brooks",
      role: "Community Manager",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop&crop=face",
      text: "Loved how simple everything was. Creating events, tracking participants, and receiving feedback was all seamless. Great experience overall!",
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[index];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
        {/* LEFT TEXT AREA */}
        <div>
          <p className="text-primary font-secondary tracking-wide mb-2">
            Testimonial
          </p>
          <h2 className="text-4xl font-primary font-medium text-gray-900 leading-tight mb-3">
            What people say
            <br />
            about EventMate
          </h2>
          <p className="text-gray-500 font-secondary max-w-md leading-relaxed">
            EventMate has made planning and managing events so much easier.
            Everything stays organized, and the experience feels smooth from
            start to finish. Our team saves time, and our guests enjoy a better
            experience.
          </p>
        </div>

        <div>
          {/* TOP ROW WITH COUNT + ARROWS */}
          <div className="flex items-center justify-between mb-4">
            <p className="tracking-widest text-sm font-medium text-primary">
              {String(index + 1).padStart(2, "0")} —{" "}
              {String(reviews.length).padStart(2, "0")}
            </p>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="text-primary hover:text-primary/50 transition"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={next}
                className="text-primary hover:text-primary/50 transition"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          <Card className="border border-primary/20 shadow-sm">
            <CardContent className="p-6 flex gap-6 items-center">
              <div className="w-28 h-28 rounded overflow-hidden">
                <Image
                  src={current.image}
                  alt="User Image"
                  width={120}
                  height={120}
                  className="object-cover rounded-md"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {current.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{current.role}</p>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {current.text}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
