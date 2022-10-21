import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    login(userDto: CreateUserDto): Promise<{
        accessToken: string;
        id: User;
    }>;
    register(userDto: CreateUserDto): Promise<UnauthorizedException>;
    check(req: any): Promise<{
        accessToken: string;
        id: User;
    }>;
    private generateToken;
    private validateUser;
}
