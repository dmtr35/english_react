import * as mongoose from 'mongoose';
export declare class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly _id: mongoose.Schema.Types.ObjectId;
}
