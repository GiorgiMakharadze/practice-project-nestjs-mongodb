import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserSettings } from '../schemas/userSettings.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private usetSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.usetSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }

    const user = new this.userModel(createUserDto);
    return user.save();
  }

  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']).exec();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings').exec();
  }

  upateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
