/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { getAllTypes } from "@/services/admin/eventTypeManagement";
import { EventType } from "@/types/event.interface";



const EventCategories = async() => {

    const result = await getAllTypes();

    const categories = result?.data?.map((category: EventType) => ({
        name: category.name,
        count: category.events?.length || 0,
      })) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium font-primary text-gray-900 mb-3">
            Browse Events by Category
          </h2>
          <p className="text-gray-600 font-secondary max-w-2xl mx-auto">
            Discover amazing events across different categories and find what interests you most
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category: any) => (
            <Button
              key={category.name}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-all duration-300 bg-white border-2 hover:border-primary"
            >
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} events</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;