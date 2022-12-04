import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {

    }

    async registerUser(username: string, email: string, password: string) {
        password = await bcrypt.hash(password, 10);
        const userEx = await this.userModel.findOne({ username: username });
        if (userEx) {
            return ("Existing user")
        }
        const newUser = new this.userModel({
            username,
            email,
            password,
        })
        const result = await newUser.save();
        return result.id as string;
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username: username });
    }



}