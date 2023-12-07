import { DataSource, Repository } from 'typeorm';
import { JoinedRoomEntity } from './joined-room.entity';
export declare class JoinedRoomRepository extends Repository<JoinedRoomEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
