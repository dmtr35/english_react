import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'

import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/user.schema'





@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user._id)
    }


    async register(userDto: CreateUserDto) {

        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        await this.userService.createUser({ ...userDto, password: hashPassword })
        return new UnauthorizedException({ message: 'Пользователь был успешно зарегистрирован' })
    }

    async check(req) {
        const user = this.jwtService.verify(req.headers.authorization)
        return this.generateToken(user.id)
    }


    private async generateToken(id: User) {
        const payload = {
            id
        }
        const accessToken = this.jwtService.sign(payload)
        return {
            accessToken,
            id
        }
    }


    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Некорретный емейл или пароль' })
    }
}
