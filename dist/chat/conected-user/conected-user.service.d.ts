import { ConectedUserRepository } from './models/conected-user.repository';
import { UserRepository } from 'src/user/model/user.repository';
export declare class ConectedUserService {
    private readonly conectedUserRepository;
    private readonly userRepository;
    constructor(conectedUserRepository: ConectedUserRepository, userRepository: UserRepository);
    getAllConectionsForUser(userId: number): Promise<import("./models/conected-user.entity").ConectedUserEntity[]>;
    create(socketId: string, userId: number): Promise<void>;
    findByUser(userId: number): Promise<import("./models/conected-user.entity").ConectedUserEntity[]>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
