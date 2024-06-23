import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017`,
      "mongodb://localhost/nestjs",
      // { dbName: 'nestusers' },
    ),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
