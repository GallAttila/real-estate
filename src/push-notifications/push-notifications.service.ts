import { PushSubscription } from './../../node_modules/@types/web-push/index.d';
import {
  ClientNotification,
  ClientNotificationDocument,
} from './schemas/clients.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/types/user';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { Model } from 'mongoose';
import * as webPush from 'web-push';

@Injectable()
export class PushNotificationsService {
  constructor(
    @InjectModel(ClientNotification.name)
    private readonly clientNotificationModel: Model<ClientNotificationDocument>,
  ) {
    const vapidKeys = {
      publicKey:
        'BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U',
      privateKey: 'CZtf_JUxmXkCKbzwaKedPPO9BFC99U2rk-GUYDbYAa8',
    };

    webPush.setVapidDetails(
      'mailto:example@yourdomain.org',
      vapidKeys.publicKey,
      vapidKeys.privateKey,
    );
  }

  create(user: User, createPushNotificationDto: CreatePushNotificationDto) {
    return this.clientNotificationModel.create({
      user,
      subscription: createPushNotificationDto,
    });
  }

  async findAll() {
    return await this.clientNotificationModel.find().exec();
  }

  findOne(username: string) {
    return `This action returns a #${username} pushNotification`;
  }

  update(user: User, updatePushNotificationDto: UpdatePushNotificationDto) {
    return this.clientNotificationModel
      .findOneAndUpdate(
        {
          'user.username': user.username,
        },
        updatePushNotificationDto,
        { new: true },
      )
      .exec();
  }

  async pushNotification(
    currentUser: User,
    receiverUsername: string,
    message: string,
  ) {
    try {
      const clientInfo = await this.getPushSubscription(receiverUsername);
      const payload = `From ${currentUser.username} to ${receiverUsername}: ${message}`;
      const options = {
        gcmAPIKey:
          'BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U',
        TTL: 60,
      };
      console.log(clientInfo.subscription, payload, options);
      const notification = await webPush.sendNotification(
        clientInfo.subscription,
        payload,
        options,
      );
      console.log('notification', notification);
    } catch (err) {
      console.log(err);
    }
  }

  async getPushSubscription(username: string) {
    return await this.clientNotificationModel.findOne().exec(); // TODO user filter
  }

  async deleteClientInfo(user: User) {
    return await this.clientNotificationModel
      .findOneAndDelete() // TODO user filter
      // .findOneAndDelete({
      //   user: { username: user.username },
      // })
      .exec();
  }
}
