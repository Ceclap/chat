import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/user/model/user.repository';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private userRepository;
    constructor(reflector: Reflector, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
