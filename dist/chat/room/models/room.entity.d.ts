import { JoinedRoomEntity } from 'src/chat/joined-room/joined-room.entity';
import { MessageEntity } from 'src/chat/message/message.entity';
import { UserEntity } from 'src/user/model/user.entity';
export declare class RoomEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users: UserEntity[];
    joinedUsers: JoinedRoomEntity[];
    messages: MessageEntity[];
}
