import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/auth/guard/api-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiKeyAuth } from 'src/decorators/apiKey.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './types/user';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/users')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiKeyAuth()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ApiAuthGuard)
  @Get('/currentUser')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @ApiKeyAuth()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ApiAuthGuard)
  @Patch('/currentUser')
  async updateCurrentUser(
    @CurrentUser() user: User,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(user.username, body);
  }

  @Get('/users/:username')
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Patch('/users/:username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(username, updateUserDto);
  }
}
