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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const user_repository_1 = require("../user/model/user.repository");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers?.authorization;
        if (!token) {
            return false;
        }
        else {
            try {
                const payload = jwt.verify(token, 'JWT_SECRET_KEY');
                const user = await this.userRepository.findOne({
                    where: { id: payload.id },
                });
                if (!user) {
                    return false;
                }
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_repository_1.UserRepository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map