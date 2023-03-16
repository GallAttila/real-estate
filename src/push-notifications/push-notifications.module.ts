import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushNotificationsController } from './push-notifications.controller';
import {
  ClientNotification,
  ClientNotificationSchema,
} from './schemas/clients.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientNotification.name, schema: ClientNotificationSchema },
    ]),
  ],
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService],
})
export class PushNotificationsModule {}
