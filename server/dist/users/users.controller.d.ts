import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.schema';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAll(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
