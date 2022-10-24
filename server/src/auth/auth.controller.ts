import { Body, Controller, Post, UsePipes, Get, Request, Req} from '@nestjs/common'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { ValidationPipe } from '../pipes/validation.pipe'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto)
    }


    @Get('/check')
    check(
        @Req() req: Request) {
        return this.authService.check(req)
    }
}

