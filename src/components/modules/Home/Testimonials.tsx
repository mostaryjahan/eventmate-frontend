/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllReviews } from "@/services/review/review.service";

const Testimonial = () =>{
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        const result = await response.json();
        setReviews(result?.data || []);
    
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    
    fetchReviews();
  }, []);
    
 
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[index];

  if (!reviews.length) {
    return (
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto text-center px-4">
          <p className="text-gray-500">No reviews available</p>
        </div>
      </section>
    );
  }

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
            about EventMate?
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

          <Card className="border border-primary/20 shadow-sm font-secondary">
            <CardContent className="p-6 flex gap-6 items-start justify-start">
              <div className="w-24 h-24 rounded overflow-hidden shrink-0">
                <Image
                  src={current?.reviewer?.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"}
                  alt="User Image"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-full border border-primary/50 shadow"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {current?.reviewer?.name || "Anonymous"}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  Rating: {current?.rating}/5 ⭐
                </p>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {current?.comment || "No comment provided"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;