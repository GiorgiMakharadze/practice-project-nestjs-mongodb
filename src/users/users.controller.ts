import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/all-users')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser || !isValid) {
      throw new NotFoundException('user not found');
    }
    return findUser;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser || !isValid) {
      throw new NotFoundException('user not found');
    }
    return this.usersService.upateUser(id, updateUserDto);
  }
}
