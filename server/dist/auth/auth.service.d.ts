import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtServise;
    constructor(userService: UsersService, jwtServise: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    register(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    check(req: any, res: any): Promise<any>;
    private generateToken;
    private validateUser;
}
