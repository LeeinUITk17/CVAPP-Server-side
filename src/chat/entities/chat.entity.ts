/* eslint-disable prettier/prettier */
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

export class Chat {
  id: number;
  roomId: number;
  senderId: number;
  message: string;
  createdAt: Date;
  room: Room;
  sender: User;
}
