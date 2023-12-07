import { DataSource, Repository } from 'typeorm';
import { ConectedUserEntity } from './conected-user.entity';
export declare class ConectedUserRepository extends Repository<ConectedUserEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
