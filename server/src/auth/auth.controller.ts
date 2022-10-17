import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto)
    }

    @Get('/check')
    check() {
        return this.authService.check()
    }
}

