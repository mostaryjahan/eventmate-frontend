
export interface EventType {
  id: string;
  name: string;
  events?: IEvent[];
}


export enum IStatus {
  OPEN = "OPEN",
  FULL = "FULL",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}


export interface IEvent {
  creator: {
    name: string;
  };
  name: string;
  dateTime: string;
  location: string;
  type: EventType;
  _count?: {
    participants: number;
  };
  joiningFee: string;
  id: string;
  image: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  status: IStatus;
  createdBy: string;
}


