import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

import { User, UserDocument } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userModel.find()
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email })
        return user
    }


}


