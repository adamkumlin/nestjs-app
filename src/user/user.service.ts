import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable({})
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Get user by name
  async get(name: string): Promise<User> {
    const existingUser = await findUserByName(name);

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }
    return existingUser;
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Delete user by name
  async delete(name: string) {
    const userToDelete = await this.userModel
      .findOneAndDelete({ name: name })
      .exec();

    if (!userToDelete) {
      return new NotFoundException('User not found.');
    }
    return userToDelete;
  }

}

async function findUserByName(name: string): Promise<User> {
  const existingUser = await this.userModel.findOne({ name: name }).exec();
  return existingUser;
}
