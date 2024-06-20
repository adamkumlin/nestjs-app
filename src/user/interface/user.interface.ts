import { Document } from "mongoose";

export interface IUser extends Document {
  readonly name: string;
  readonly displayName: string;
  readonly email: string;
  readonly profileImage: string;
  readonly joinDate: Date;
}