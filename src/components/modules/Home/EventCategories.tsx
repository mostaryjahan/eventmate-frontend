/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { getAllTypes } from "@/services/admin/eventTypeManagement";
import { EventType } from "@/types/event.interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import bg from "../../../assets/home/img-1.jpg";

const EventCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllTypes();
      const categoriesData = result?.data?.map((category: EventType) => ({
        name: category.name,
        count: category.events?.length || 0,
      })) || [];
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/events?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section 
      className="py-16 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium font-primary text-white mb-3">
            Browse Events by Category
          </h2>
          <p className="text-gray-200 font-secondary max-w-2xl mx-auto">
            Discover amazing events across different categories and find what interests you most
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(0,6).map((category: any) => (
            <Button
              key={category.name}
              variant="outline"
              onClick={() => handleCategoryClick(category.name)}
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-all duration-300 bg-primary/5 backdrop-blur-sm border border-gray-400 hover:border-gray/600 hover:bg-white/20 cursor-pointer"
            >
              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-100">{category.name}</h3>
                <p className="text-sm text-white">{category.count} events</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;