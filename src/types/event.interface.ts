export interface IEvent {
  creator: {
    name: string;
  };
  name: string;
  dateTime: string;
  location: string;
  type: string;
  _count?: {
    participants: number;
  };
  joiningFee: string;
  id: string;
  image: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
}


