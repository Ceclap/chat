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
exports.JoinedRoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const joined_room_repository_1 = require("./joined-room.repository");
const room_repository_1 = require("../room/models/room.repository");
const user_repository_1 = require("../../user/model/user.repository");
let JoinedRoomService = exports.JoinedRoomService = class JoinedRoomService {
    constructor(joinedRoomRepository, roomRepository, userRepository) {
        this.joinedRoomRepository = joinedRoomRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }
    async create(socketId, userId, roomId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room) {
            throw new common_1.BadRequestException('room not found');
        }
        const joinedRoom = this.joinedRoomRepository.create({
            socketId,
            room,
            user,
        });
        console.log('roomroomroomroomroomroomroom');
        console.log(joinedRoom);
        return await this.joinedRoomRepository.save(joinedRoom);
    }
    async findByUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const joinedRooms = await this.joinedRoomRepository.find({
            relations: {
                user: true,
            },
        });
        return joinedRooms.filter((x) => x.user.id === user.id);
    }
    async findByRoom(roomId) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room) {
            throw new common_1.BadRequestException('room not found');
        }
        const joinedRooms = await this.joinedRoomRepository.find({
            relations: {
                room: true,
                user: true,
            },
        });
        return joinedRooms.filter((x) => x.room.id === room.id);
    }
    async deleteBySocketId(socketId) {
        await this.joinedRoomRepository.delete({ socketId });
    }
    async deleteAll() {
        await this.joinedRoomRepository.createQueryBuilder().delete().execute();
    }
};
exports.JoinedRoomService = JoinedRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(joined_room_repository_1.JoinedRoomRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [joined_room_repository_1.JoinedRoomRepository,
        room_repository_1.RoomRepository,
        user_repository_1.UserRepository])
], JoinedRoomService);
//# sourceMappingURL=joined-room.service.js.map