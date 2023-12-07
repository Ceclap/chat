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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_repository_1 = require("./models/room.repository");
const user_repository_1 = require("../../user/model/user.repository");
let RoomService = exports.RoomService = class RoomService {
    constructor(roomRepository, userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }
    async createRoom(roomData) {
        const creator = await this.userRepository.findOne({
            where: { id: roomData.idCreator },
            relations: {
                rooms: true,
            },
            select: {
                id: true,
                email: true,
                username: true,
                rooms: true,
            },
        });
        if (!creator) {
            throw new common_1.BadRequestException('id is not valid');
        }
        const newRoom = this.roomRepository.create({
            name: roomData.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            users: [creator],
        });
        creator.rooms.push(newRoom);
        console.log(newRoom);
        await this.roomRepository.save(newRoom);
        console.log(creator);
        await this.userRepository.save(creator);
        return newRoom;
    }
    async addUserToRoom(roomId, userId) {
        const newUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!newUser) {
            throw new common_1.BadRequestException('user not found');
        }
        const room = await this.roomRepository.findOne({
            where: { id: roomId },
            relations: { users: true },
            select: {
                users: true,
            },
        });
        if (!room) {
            throw new common_1.BadRequestException('room not found');
        }
        if (!room.users.map((user) => user.id).includes(newUser.id)) {
            room.users.push(newUser);
            room.updatedAt = new Date();
        }
        console.log(room);
        return await this.roomRepository.save(room);
    }
    async getRoomsForUser(userId) {
        const newUser = await this.userRepository.findOne({
            where: { id: userId },
            relations: {
                rooms: true,
            },
            select: {
                id: true,
                rooms: true,
            },
        });
        if (!newUser) {
            throw new common_1.BadRequestException('user not found');
        }
        console.log('user', newUser);
        return newUser.rooms;
    }
};
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [room_repository_1.RoomRepository,
        user_repository_1.UserRepository])
], RoomService);
//# sourceMappingURL=room.service.js.map