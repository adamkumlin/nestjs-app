import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({})
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.usersModel(createUserDto);

    if (
      (await this.getUserByName(createdUser.name)) ||
      (await this.getUserByEmail(createUserDto.email))
    ) {
      throw new ConflictException('Username or email is already in use.');
    }
    return createdUser.save();
  }

  // Get user by name
  async get(name: string): Promise<User> {
    const existingUser = await this.getUserByName(name);

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }
    return existingUser;
  }

  async getAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }

  async update(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Get the user
    const updatedUser = new this.usersModel(updateUserDto);

    if (
      (await this.getUserByName(updatedUser.name)) ||
      (await this.getUserByEmail(updatedUser.email))
    ) {
      throw new ConflictException('Username or email is already in use.');
    }

    // Find by name and update
    return this.usersModel.findOneAndUpdate({ name: name }, updateUserDto).exec();
  }

  // Delete user by name
  async delete(name: string) {
    if (!this.getUserByName) {
      return new NotFoundException('User not found.');
    }
    const userToDelete = await this.usersModel
      .findOneAndDelete({ name: name })
      .exec();

    return userToDelete;
  }

  //==================================================================================================
  // Helper methods
  async getUserByName(name: string): Promise<User | null> {
    const existingUser = await this.usersModel.findOne({ name: name }).exec();
    return existingUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const existingUser = await this.usersModel.findOne({ email: email }).exec();
    return existingUser;
  }
}
