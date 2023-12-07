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
exports.ConectedUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conected_user_repository_1 = require("./models/conected-user.repository");
const user_repository_1 = require("../../user/model/user.repository");
let ConectedUserService = exports.ConectedUserService = class ConectedUserService {
    constructor(conectedUserRepository, userRepository) {
        this.conectedUserRepository = conectedUserRepository;
        this.userRepository = userRepository;
    }
    async getAllConectionsForUser(userId) {
        const conecttions = await this.conectedUserRepository.find({
            relations: { user: true },
        });
        return conecttions.filter((x) => x.user.id === userId);
    }
    async create(socketId, userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const connectedUser = this.conectedUserRepository.create({
            socketId: socketId,
            user: user,
        });
        console.log('esdjn');
        console.log(connectedUser);
        await this.conectedUserRepository.save(connectedUser);
        console.log(user);
        console.log('test10');
    }
    async findByUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const conectedUsers = await this.conectedUserRepository.find({
            relations: {
                user: true,
            },
        });
        return conectedUsers.filter((x) => x.user.id === user.id);
    }
    async deleteBySocketId(socketId) {
        return await this.conectedUserRepository.delete({ socketId });
    }
    async deleteAll() {
        await this.conectedUserRepository.createQueryBuilder().delete().execute();
    }
};
exports.ConectedUserService = ConectedUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conected_user_repository_1.ConectedUserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [conected_user_repository_1.ConectedUserRepository,
        user_repository_1.UserRepository])
], ConectedUserService);
//# sourceMappingURL=conected-user.service.js.map