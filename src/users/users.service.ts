import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersModel.create(createUserDto);
    return;
  }

  async findAll() {
    return await this.usersModel.find().exec();
  }

  async findOne(username: string) {
    return await this.usersModel.findOne({ username }).exec();
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel
      .findOneAndUpdate({ username }, updateUserDto, { new: true })
      .exec();
  }
}
