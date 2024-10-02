import { Chat } from 'src/chat/entities/chat.entity';
import { RoomUser } from 'src/room-user/entities/room-user.entity';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  Chat?: Chat[];
  RoomUser?: RoomUser[];
}
