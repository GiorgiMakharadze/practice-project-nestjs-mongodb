import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModue } from './users/users.mdoule';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/nest'), UsersModue],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
