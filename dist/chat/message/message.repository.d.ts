import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
export declare class MessageRepository extends Repository<MessageEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
