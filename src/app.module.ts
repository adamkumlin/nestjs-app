import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserValidationMiddleware } from './middleware/user-validation.middleware';
import { RequestBodyValidationMiddleware } from './middleware/request-body-validation.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      dbName: 'NestUsers',
    }),
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply to all requests with path "users/<user>"
    consumer
      .apply(UserValidationMiddleware)
      .forRoutes({ path: 'users/*', method: RequestMethod.ALL });

    // Excludes GET requests
    consumer
      .apply(RequestBodyValidationMiddleware)
      .exclude({
        path: 'users/*',
        method: RequestMethod.GET,
      })
      .forRoutes(UsersController);
  }
}
