"use client"

import { Calendar } from "@/components/ui/calendar"
import { IEvent } from "@/types/event.interface"
import { useState } from "react"
import Link from "next/link"

interface EventCalendarProps {
  events: IEvent[]
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.dateTime)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  // Get all event dates for highlighting
  const eventDates = events.map(event => new Date(event.dateTime))

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={{
          hasEvent: eventDates
        }}
        modifiersStyles={{
          hasEvent: { 
            backgroundColor: '#a11f65', 
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        className="rounded-md border"
      />
      
      {selectedDate && (
        <div className="space-y-2">
          <h4 className="font-medium">
            Events on {selectedDate.toLocaleDateString()}
          </h4>
          {selectedDateEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events on this date</p>
          ) : (
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-2 bg-gray-50 rounded text-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.dateTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-xs text-[#a11f65] hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}