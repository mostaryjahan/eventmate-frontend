"use client";

import { IEvent } from "@/types/event.interface";
import { useEffect, useMemo, useState } from "react";

interface FilterProps {
  events: IEvent[];
  onFilterChange: (filtered: IEvent[]) => void;
}

const Filter = ({ events, onFilterChange }: FilterProps) => {
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchType) {
      filtered = filtered.filter((event) =>
        event.type.name.toLowerCase().includes(searchType.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter((event) =>
        event.dateTime.includes(searchDate)
      );
    }

    if (searchLocation) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    return filtered;
  }, [searchType, searchDate, searchLocation, events]);

  useEffect(() => {
    onFilterChange(filteredEvents);
  }, [filteredEvents, onFilterChange]);

  return (
    <div className="container w-max-xl mx-auto bg-white rounded-md shadow-lg p-8 pb-12  left-1/2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center">
          <input
            type="text"
            placeholder="Event Location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Date */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center justify-between">
          <input
            type="date"
            className="w-full bg-transparent outline-none text-sm"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center justify-between">
          <input
            type="text"
            placeholder="Category"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
