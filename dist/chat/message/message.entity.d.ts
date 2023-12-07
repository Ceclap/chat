import { UserEntity } from 'src/user/model/user.entity';
import { RoomEntity } from '../room/models/room.entity';
export declare class MessageEntity {
    id: number;
    text: string;
    user: UserEntity;
    room: RoomEntity;
    createdAt: Date;
}
