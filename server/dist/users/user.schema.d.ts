import { Document } from 'mongoose';
import mongoose from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
