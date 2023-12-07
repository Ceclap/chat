import { ConectedUserEntity } from 'src/chat/conected-user/models/conected-user.entity';
import { JoinedRoomEntity } from 'src/chat/joined-room/joined-room.entity';
import { MessageEntity } from 'src/chat/message/message.entity';
import { RoomEntity } from 'src/chat/room/models/room.entity';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    emailToLowerCase(): void;
    rooms: RoomEntity[];
    conection: ConectedUserEntity[];
    joinedRooms: JoinedRoomEntity[];
    messages: MessageEntity[];
}
