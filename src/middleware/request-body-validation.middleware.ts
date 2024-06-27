import {
  ConflictException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class RequestBodyValidationMiddleware implements NestMiddleware {
  // Inject UserModel to be able to query the collection
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      const requestBody = JSON.stringify(req.body);
      const bodyObject = JSON.parse(requestBody);

      if (
        (await this.getUserByName(bodyObject.name)) ||
        (await this.getUserByEmail(bodyObject.email))
      ) {
        throw new ConflictException('Username or email is already in use.');
      }
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
