import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    register(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    check(req: any): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
