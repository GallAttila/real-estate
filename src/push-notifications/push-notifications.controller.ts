import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/types/user';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { PushNotificationsService } from './push-notifications.service';

@ApiExcludeController()
@Controller('push-notifications')
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @Auth('push-notifications')
  @Post('client-info')
  create(
    @Body() createPushNotificationDto: CreatePushNotificationDto,
    @CurrentUser() user: User,
  ) {
    return this.pushNotificationsService.create(
      user,
      createPushNotificationDto,
    );
  }

  @Auth('push-notifications')
  @Put('client-info')
  update(
    @Body() createPushNotificationDto: CreatePushNotificationDto,
    @CurrentUser() user: User,
  ) {
    return this.pushNotificationsService.update(
      user,
      createPushNotificationDto,
    );
  }

  @Auth('push-notifications')
  @Delete('client-info')
  deleteClientInfo(@CurrentUser() user: User) {
    return this.pushNotificationsService.deleteClientInfo(user);
  }

  @Auth('push-notifications')
  @Post(':username')
  sendMessage(
    @Param('username') receiverUsername: string,
    @Body() body: SendMessageDto,
    @CurrentUser() user: User,
  ) {
    this.pushNotificationsService.pushNotification(
      user,
      receiverUsername,
      body.message,
    );
  }

  @Get('client-info/')
  async findAll() {
    return await this.pushNotificationsService.findAll();
  }

  // @Put(':username')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePushNotificationDto: UpdatePushNotificationDto,
  // ) {
  //   return this.pushNotificationsService.update(+id, updatePushNotificationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pushNotificationsService.remove(+id);
  // }
}
