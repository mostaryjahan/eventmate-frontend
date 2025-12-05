import { Button } from "@/components/ui/button";
import { Music, Calendar, Users, Trophy, Camera, Utensils } from "lucide-react";

const categories = [
  { name: "Music", icon: Music, count: "120+ Events" },
  { name: "Sports", icon: Trophy, count: "85+ Events" },
  { name: "Food", icon: Utensils, count: "95+ Events" },
  { name: "Social", icon: Users, count: "200+ Events" },
  { name: "Photography", icon: Camera, count: "45+ Events" },
  { name: "Business", icon: Calendar, count: "75+ Events" },
];

const EventCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Events by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing events across different categories and find what interests you most
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-all duration-300 bg-white border-2 hover:border-primary"
              >
                <IconComponent className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;