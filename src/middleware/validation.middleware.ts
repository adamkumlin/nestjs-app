import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  use(req: Request, res: Response, next: NextFunction) {

    // Get the path excluding the initial forward slash
    const requestPath = req.path.slice(1);

    console.log(requestPath)
    if (!this.getUserByName(requestPath)) {
      return new NotFoundException('User not found.');
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
