"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const room_service_1 = require("./room/room.service");
const room_entity_1 = require("./room/models/room.entity");
const message_entity_1 = require("./message/message.entity");
const message_service_1 = require("./message/message.service");
const room_repository_1 = require("./room/models/room.repository");
const user_repository_1 = require("../user/model/user.repository");
const message_repository_1 = require("./message/message.repository");
const joined_room_entity_1 = require("./joined-room/joined-room.entity");
const joined_room_service_1 = require("./joined-room/joined-room.service");
const joined_room_repository_1 = require("./joined-room/joined-room.repository");
const conected_user_service_1 = require("./conected-user/conected-user.service");
const conected_user_entity_1 = require("./conected-user/models/conected-user.entity");
const conected_user_repository_1 = require("./conected-user/models/conected-user.repository");
let ChatModule = exports.ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                room_entity_1.RoomEntity,
                conected_user_entity_1.ConectedUserEntity,
                joined_room_entity_1.JoinedRoomEntity,
                message_entity_1.MessageEntity,
            ]),
        ],
        providers: [
            chat_gateway_1.ChatGateway,
            user_repository_1.UserRepository,
            room_service_1.RoomService,
            room_repository_1.RoomRepository,
            conected_user_service_1.ConectedUserService,
            conected_user_repository_1.ConectedUserRepository,
            joined_room_repository_1.JoinedRoomRepository,
            message_repository_1.MessageRepository,
            joined_room_service_1.JoinedRoomService,
            message_service_1.MessageService,
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map