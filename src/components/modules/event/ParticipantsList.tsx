import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Participant {
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

interface ParticipantsListProps {
  participants: Participant[];
  maxDisplay?: number;
}

export function ParticipantsList({ participants, maxDisplay = 10 }: ParticipantsListProps) {
  const displayParticipants = participants.slice(0, maxDisplay);
  const remaining = participants.length - maxDisplay;

  return (
    <div>
      <h3 className="font-semibold mb-4">Who's Going ({participants.length})</h3>
      <div className="flex flex-wrap gap-4">
        {displayParticipants.map((participant) => (
          <Link 
            key={participant.user.id} 
            href={`/profile/${participant.user.id}`}
            className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <Avatar>
              <AvatarImage src={participant.user.image} />
              <AvatarFallback>{participant.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{participant.user.name}</span>
          </Link>
        ))}
        {remaining > 0 && (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-sm font-semibold">
            +{remaining}
          </div>
        )}
      </div>
    </div>
  );
}
