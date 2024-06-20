import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017`,
      { dbName: 'nestusers' },
    ),
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  ],
})
export class AppModule {}
