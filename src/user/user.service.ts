import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable({})
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectConnection() private connection: Connection) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async get(id: string): Promise<User> {
        const existingUser = await this.userModel.findById(id).exec();

        if (!existingUser) {
            throw new NotFoundException("User not found.")
        }
        return existingUser;
    }

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async delete(id: string) {
        const catToDelete = await this.userModel.findOneAndDelete({_id: id}).exec();
        return catToDelete;
    }
}