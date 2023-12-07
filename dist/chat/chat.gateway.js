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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const user_repository_1 = require("../user/model/user.repository");
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room/room.service");
const conected_user_service_1 = require("./conected-user/conected-user.service");
const joined_room_service_1 = require("./joined-room/joined-room.service");
const message_service_1 = require("./message/message.service");
const room_repository_1 = require("./room/models/room.repository");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(userRepository, roomService, conectedUserService, joinedRoomService, roomRepository, messageService) {
        this.userRepository = userRepository;
        this.roomService = roomService;
        this.conectedUserService = conectedUserService;
        this.joinedRoomService = joinedRoomService;
        this.roomRepository = roomRepository;
        this.messageService = messageService;
    }
    async onModuleInit() {
        await this.conectedUserService.deleteAll();
        await this.joinedRoomService.deleteAll();
    }
    async handleConnection(client) {
        console.log(client.id, ' connected');
        try {
            const token = client.handshake.headers?.authorization;
            if (!token) {
                client.disconnect();
                throw new common_1.UnauthorizedException('Insert token');
            }
            const payload = jwt.verify(token, 'JWT_SECRET_KEY');
            console.log('payload', payload);
            if (!payload) {
                client.disconnect();
                throw new common_1.BadRequestException('token is not valid');
            }
            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });
            if (!user) {
                client.disconnect();
                throw new common_1.BadRequestException('User does not exist in db');
            }
            client.data.user = user;
            this.server.emit('message', `user ${user.username} with id ${client.data.user.id} has conected`);
            const rooms = await this.roomService.getRoomsForUser(user.id);
            await this.conectedUserService.create(client.id, client.data.user.id);
            this.server.to(client.id).emit('rooms', rooms);
        }
        catch (error) {
            console.log(error);
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        console.log(client.data.user.username, ' disconnected');
        await this.conectedUserService.deleteBySocketId(client.id);
        client.disconnect();
    }
    async createRoom(client, payload) {
        const conections = await this.conectedUserService.getAllConectionsForUser(client.data.user.id);
        const room = await this.roomService.createRoom({
            name: payload,
            idCreator: client.data.user.id,
        });
        conections.forEach((x) => this.server.to(x.socketId).emit('rooms', room));
        return room;
    }
    async addToRoom(client, payload) {
        const conections = await this.conectedUserService.getAllConectionsForUser(payload.userId);
        const room = await this.roomService.addUserToRoom(payload.roomId, payload.userId);
        conections.forEach((x) => this.server.to(x.socketId).emit('rooms', room));
        return room;
    }
    async onJoinRoom(client, roomId) {
        console.log('try jo join');
        const room = await this.roomRepository.findOne({
            where: { id: roomId },
            relations: {
                users: true,
            },
        });
        if (!room) {
            this.server.to(client.id).emit('general', 'Room does not exist');
        }
        if (!room?.users.map((x) => x.id).includes(client.data.user.id)) {
            this.server.to(client.id).emit('general', 'you are not in this room');
        }
        else {
            const messages = await this.messageService.getMessagesForRoom(roomId);
            await this.joinedRoomService.create(client.id, client.data.user.id, roomId);
            this.server.to(client.id).emit('messages', messages);
        }
    }
    async onLeaveRoom(client) {
        await this.joinedRoomService.deleteBySocketId(client.id);
    }
    async onSendMessage(client, message) {
        if (!message.text) {
            throw new common_1.BadRequestException('Message should not be empty');
        }
        if (message.userId !== client.data.user.id) {
            throw new common_1.BadRequestException('not the same id');
        }
        const joinedRooms = await this.joinedRoomService.findByUser(message.userId);
        console.log(joinedRooms);
        if (!joinedRooms.map((x) => x.user.id).includes(message.userId)) {
            throw new common_1.BadRequestException('you have not joined the room');
        }
        const joinedUsers = await this.joinedRoomService.findByRoom(message.roomId);
        console.log('joinedUsers', joinedUsers);
        if (!joinedUsers.map((x) => x.user.id).includes(message.userId)) {
            throw new common_1.BadRequestException('user is not joined in the room');
        }
        const createdMessage = await this.messageService.create(message);
        for (const user of joinedUsers) {
            this.server.to(user.socketId).emit('messages', createdMessage);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Socket)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addToRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "addToRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        room_service_1.RoomService,
        conected_user_service_1.ConectedUserService,
        joined_room_service_1.JoinedRoomService,
        room_repository_1.RoomRepository,
        message_service_1.MessageService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map