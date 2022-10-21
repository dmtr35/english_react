import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<{
        accessToken: string;
        id: import("../users/user.schema").User;
    }>;
    register(userDto: CreateUserDto): Promise<import("@nestjs/common").UnauthorizedException>;
    check(req: Request): Promise<{
        accessToken: string;
        id: import("../users/user.schema").User;
    }>;
}
