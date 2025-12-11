import EventForm from "@/components/modules/event/EventForm";
import { getEventsById } from "@/services/admin/eventManagement";
import { notFound } from "next/navigation";

interface EditEventPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  let eventData;
  try {
    const result = await getEventsById(id);
    
    if (!result || !result.success || !result.data) {
      notFound();
    }

    eventData = result.data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    notFound();
  }

  return <EventForm event={eventData} />;
};

export default EditEventPage;