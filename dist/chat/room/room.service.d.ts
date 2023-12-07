import { RoomRepository } from './models/room.repository';
import { UserRepository } from 'src/user/model/user.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomEntity } from './models/room.entity';
export declare class RoomService {
    private readonly roomRepository;
    private readonly userRepository;
    constructor(roomRepository: RoomRepository, userRepository: UserRepository);
    createRoom(roomData: CreateRoomDto): Promise<any>;
    addUserToRoom(roomId: number, userId: number): Promise<RoomEntity>;
    getRoomsForUser(userId: number): Promise<RoomEntity[]>;
}
