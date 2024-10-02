/* eslint-disable prettier/prettier */
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

export class RoomUser {
  id: number;
  roomId: number;
  userId: number;
  room: Room;
  user: User;
}
