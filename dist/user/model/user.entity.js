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
exports.UserEntity = void 0;
const conected_user_entity_1 = require("../../chat/conected-user/models/conected-user.entity");
const joined_room_entity_1 = require("../../chat/joined-room/joined-room.entity");
const message_entity_1 = require("../../chat/message/message.entity");
const room_entity_1 = require("../../chat/room/models/room.entity");
const typeorm_1 = require("typeorm");
let UserEntity = exports.UserEntity = class UserEntity {
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "emailToLowerCase", null);
__decorate([
    (0, typeorm_1.ManyToMany)(() => room_entity_1.RoomEntity, (room) => room.users),
    __metadata("design:type", Array)
], UserEntity.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conected_user_entity_1.ConectedUserEntity, (conection) => conection.user, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        nullable: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "conection", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => joined_room_entity_1.JoinedRoomEntity, (joinedRooms) => joinedRooms.room),
    __metadata("design:type", Array)
], UserEntity.prototype, "joinedRooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (messages) => messages.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
//# sourceMappingURL=user.entity.js.map