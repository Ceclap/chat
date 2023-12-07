import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login-dto';
import { UserEntity } from './model/user.entity';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUser: CreateUserDto): Promise<CreateUserDto>;
    findAll(query: PaginateQuery): Promise<Paginated<UserEntity>>;
    me(token: string): Promise<UserEntity | null>;
    login(logInData: LogInDto): Promise<string>;
}
