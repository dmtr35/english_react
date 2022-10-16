import { Body, Controller, Post, Get, UseGuards, UsePipes } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './user.schema'
// import { ValidationPipe } from '../pipes/validation.pipe'

@Controller('users')
export class UsersController {


    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }



}