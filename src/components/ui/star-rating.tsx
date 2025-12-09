"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ rating, onRatingChange, readonly = false, size = 20 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "cursor-pointer transition-colors",
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
            readonly && "cursor-default"
          )}
          onClick={() => !readonly && onRatingChange?.(star)}
        />
      ))}
    </div>
  );
}
