"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./model/user.repository");
const common_1 = require("@nestjs/common");
const nestjs_paginate_1 = require("nestjs-paginate");
let UserService = exports.UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(newUser) {
        if (!newUser) {
            throw new common_1.BadRequestException('Your data are not valid');
        }
        const foundUser = await this.userRepository.findOne({
            where: { email: newUser.email },
        });
        if (foundUser) {
            throw new common_1.BadRequestException('User already exist');
        }
        const user = this.userRepository.create({
            username: newUser.username,
            email: newUser.email,
            password: await bcrypt.hash(newUser.password, 10),
        });
        return await this.userRepository.save(user);
    }
    async me(token) {
        console.log(token);
        const payload = jwt.verify(token, 'JWT_SECRET_KEY');
        const user = await this.userRepository.findOne({
            where: { id: payload.id },
        });
        return user;
    }
    async login(user) {
        if (!user) {
            throw new common_1.BadRequestException('Your data are not valid');
        }
        const foundUser = await this.userRepository.findOne({
            where: { email: user.email },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
            },
        });
        if (!foundUser) {
            throw new common_1.BadRequestException('User do not exist');
        }
        const matchPassword = await bcrypt.compare(user.password, foundUser.password);
        if (!matchPassword) {
            throw new common_1.UnauthorizedException('Check your password');
        }
        console.log(jwt.sign({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
        }, 'JWT_SECRET_KEY', { expiresIn: '14d' }));
        return jwt.sign({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
        }, 'JWT_SECRET_KEY', { expiresIn: '14d' });
    }
    async findAll(query) {
        return (0, nestjs_paginate_1.paginate)(query, this.userRepository, {
            sortableColumns: ['id', 'username'],
            defaultSortBy: [['id', 'DESC']],
            searchableColumns: ['id', 'username'],
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map