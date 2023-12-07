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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_repository_1 = require("./message.repository");
const room_repository_1 = require("../room/models/room.repository");
const user_repository_1 = require("../../user/model/user.repository");
let MessageService = exports.MessageService = class MessageService {
    constructor(messageRepository, roomRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }
    async create(data) {
        const user = await this.userRepository.findOne({
            where: { id: data.userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const room = await this.roomRepository.findOne({
            where: { id: data.roomId },
        });
        if (!room) {
            throw new common_1.BadRequestException('room not found');
        }
        const message = this.messageRepository.create({
            text: data.text,
            user,
            room,
            createdAt: new Date(),
        });
        console.log('messprices[j]-prices[i]prices[j]-prices[i]prices[j]-prices[i]prices[j]-prices[i]prices[j]-prices[i]');
        console.log(message);
        return await this.messageRepository.save(message);
    }
    async getMessagesForRoom(roomId) {
        console.log('fcghbskjhbvgd');
        const room = await this.roomRepository.findOne({
            where: { id: roomId },
        });
        if (!room) {
            throw new common_1.BadRequestException('room not found');
        }
        console.log('jhecbe');
        const messages = await this.messageRepository.find({
            order: { createdAt: 'ASC' },
            relations: ['room', 'user'],
        });
        return messages.filter((x) => x.room.id === room.id);
    }
};
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_repository_1.MessageRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        room_repository_1.RoomRepository,
        user_repository_1.UserRepository])
], MessageService);
//# sourceMappingURL=message.service.js.map