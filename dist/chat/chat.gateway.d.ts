import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserRepository } from 'src/user/model/user.repository';
import { OnModuleInit } from '@nestjs/common';
import { RoomService } from './room/room.service';
import { RoomEntity } from './room/models/room.entity';
import { ConectedUserService } from './conected-user/conected-user.service';
import { JoinedRoomService } from './joined-room/joined-room.service';
import { MessageService } from './message/message.service';
import { RoomRepository } from './room/models/room.repository';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayConnection, OnModuleInit {
    private readonly userRepository;
    private readonly roomService;
    private readonly conectedUserService;
    private readonly joinedRoomService;
    private readonly roomRepository;
    private readonly messageService;
    constructor(userRepository: UserRepository, roomService: RoomService, conectedUserService: ConectedUserService, joinedRoomService: JoinedRoomService, roomRepository: RoomRepository, messageService: MessageService);
    onModuleInit(): Promise<void>;
    server: Socket;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    createRoom(client: Socket, payload: string): Promise<RoomEntity>;
    addToRoom(client: Socket, payload: {
        roomId: number;
        userId: number;
    }): Promise<RoomEntity>;
    onJoinRoom(client: Socket, roomId: number): Promise<void>;
    onLeaveRoom(client: Socket): Promise<void>;
    onSendMessage(client: Socket, message: {
        text: string;
        userId: number;
        roomId: number;
    }): Promise<void>;
}
