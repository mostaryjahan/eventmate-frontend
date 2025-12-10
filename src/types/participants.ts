import { IEvent } from "./event.interface";
import { UserInfo } from "./user.interface";

export interface IParticipant {
  user: UserInfo
  event: IEvent
  joinedAt: string
}