import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({})
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  // Read body of request to create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  // Get user by name
  async get(name: string): Promise<User> {
    const existingUser = await this.usersModel.findOne({ name: name }).exec();
    return existingUser;
  }

  // Get all users
  async getAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }

  // Find by name and update, read body of request
  async update(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersModel.findOneAndUpdate({ name: name }, updateUserDto).exec();
  }

  // Delete user by name
  async delete(name: string) {
    const userToDelete = await this.usersModel
      .findOneAndDelete({ name: name })
      .exec();

    return userToDelete;
  }
}
