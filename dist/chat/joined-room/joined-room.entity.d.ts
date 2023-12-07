import { UserEntity } from 'src/user/model/user.entity';
import { RoomEntity } from '../room/models/room.entity';
export declare class JoinedRoomEntity {
    id: number;
    socketId: string;
    user: UserEntity;
    room: RoomEntity;
}
