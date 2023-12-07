import { DataSource, Repository } from 'typeorm';
import { RoomEntity } from './room.entity';
export declare class RoomRepository extends Repository<RoomEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
