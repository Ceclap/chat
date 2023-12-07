import { MessageRepository } from './message.repository';
import { MessageEntity } from './message.entity';
import { RoomRepository } from '../room/models/room.repository';
import { UserRepository } from 'src/user/model/user.repository';
export declare class MessageService {
    private readonly messageRepository;
    private readonly roomRepository;
    private readonly userRepository;
    constructor(messageRepository: MessageRepository, roomRepository: RoomRepository, userRepository: UserRepository);
    create(data: {
        text: string;
        userId: number;
        roomId: number;
    }): Promise<MessageEntity>;
    getMessagesForRoom(roomId: number): Promise<MessageEntity[]>;
}
