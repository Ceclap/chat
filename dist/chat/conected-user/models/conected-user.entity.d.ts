import { UserEntity } from 'src/user/model/user.entity';
export declare class ConectedUserEntity {
    id: number;
    socketId: string;
    user: UserEntity;
}
