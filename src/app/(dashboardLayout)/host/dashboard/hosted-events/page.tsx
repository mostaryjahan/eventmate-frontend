
import EventManagement from "@/components/modules/event/EventManagement";
import { Button } from "@/components/ui/button";



const HostedEvents = async () => {
 
  return (
    <div>
     <h1 className="text-2xl font-semibold mb-6">Event Management</h1>
      <Button className="bg-blue-600 flex justify-end mx-auto">Create Event</Button>

      <div>
       
        <EventManagement/>
         
       
      </div>
    </div>
  );
};

export default HostedEvents;
