import { JoinedRoomRepository } from './joined-room.repository';
import { JoinedRoomEntity } from './joined-room.entity';
import { RoomRepository } from '../room/models/room.repository';
import { UserRepository } from 'src/user/model/user.repository';
export declare class JoinedRoomService {
    private readonly joinedRoomRepository;
    private readonly roomRepository;
    private readonly userRepository;
    constructor(joinedRoomRepository: JoinedRoomRepository, roomRepository: RoomRepository, userRepository: UserRepository);
    create(socketId: string, userId: number, roomId: number): Promise<JoinedRoomEntity>;
    findByUser(userId: number): Promise<JoinedRoomEntity[]>;
    findByRoom(roomId: number): Promise<JoinedRoomEntity[]>;
    deleteBySocketId(socketId: string): Promise<void>;
    deleteAll(): Promise<void>;
}
