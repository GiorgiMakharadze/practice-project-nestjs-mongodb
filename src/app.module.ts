import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModue } from './users/users.mdoule';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/nest'), UsersModue],
  controllers: [],
  providers: [],
})
export class AppModule {}
