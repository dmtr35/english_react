import { Body, Controller, Post, Get, UseGuards, UsePipes } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ValidationPipe } from '../pipes/validation.pipe'
// import { ValidationPipe } from '../pipes/validation.pipe'

@Controller('users')
export class UsersController {


    constructor(private usersService: UsersService) { }

    @UsePipes(ValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }



}