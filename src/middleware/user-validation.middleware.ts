import { ConflictException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  // Inject UserModel to be able to query the collection
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the path excluding the "users/" before
    const requestPath = req.path.slice(7);

    // Get the passed user
    const passedUser = await this.getUserByName(requestPath);

    if (!passedUser) {
      throw new NotFoundException('User not found.');
    }
    
    next();
  }

  async getUserByName(name: string): Promise<User | null> {
    const existingUser = await this.usersModel.findOne({ name: name }).exec();
    return existingUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const existingUser = await this.usersModel.findOne({ email: email }).exec();
    return existingUser;
  }
}
