/* eslint-disable prettier/prettier */
import { Chat } from '../../chat/entities/chat.entity';
import { RoomUser } from '../../room-user/entities/room-user.entity';

export class Room {
  id: number;
  name: string;
  createdAt: Date;
  chats?: Chat[];
  users?: RoomUser[];
}
