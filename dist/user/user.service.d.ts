import { UserEntity } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './model/user.repository';
import { LogInDto } from './dto/login-dto';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    create(newUser: CreateUserDto): Promise<UserEntity>;
    me(token: string): Promise<UserEntity | null>;
    login(user: LogInDto): Promise<string>;
    findAll(query: PaginateQuery): Promise<Paginated<UserEntity>>;
}
