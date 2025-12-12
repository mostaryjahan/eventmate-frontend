import AllEvents from "@/components/modules/event/AllEvents";
import { Suspense } from "react";

const AllEventsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-20 mb-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white shadow rounded-xl p-4 space-y-4"
            >
              <div className="h-40 bg-gray-200 rounded-md" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-10 bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>
      }
    >
      <AllEvents />
    </Suspense>
  );
};

export default AllEventsPage;
