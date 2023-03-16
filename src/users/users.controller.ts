import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiConsumes, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './types/user';
import { UsersService } from './users.service';

@ApiTags('users (apiKey*, bearerToken*)')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Auth('users')
  @ApiExcludeEndpoint()
  @Post('/users')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Auth('users')
  @ApiExcludeEndpoint()
  @Get('/users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Auth('users')
  @ApiConsumes()
  @Get('/currentUser')
  async getCurrentUser(@CurrentUser() user: User) {
    return await this.usersService.findOne(user.username);
  }

  @Auth('users')
  @Patch('/currentUser')
  async updateCurrentUser(
    @CurrentUser() user: User,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(user.username, body);
  }

  @Auth('users')
  @ApiExcludeEndpoint()
  @Get('/users/:username')
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Auth('users')
  @ApiExcludeEndpoint()
  @Patch('/users/:username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(username, updateUserDto);
  }
}
