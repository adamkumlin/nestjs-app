import { Injectable } from "@nestjs/common";
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

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async delete(id: string) {
        const catToDelete = await this.userModel.findOneAndDelete({_id: id}).exec();
        return catToDelete;
    }
}