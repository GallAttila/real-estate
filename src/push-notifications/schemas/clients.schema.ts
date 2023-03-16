import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/types/user';
import { ClientNotificationSubscription } from '../types/ClientNotificationSubscription';

export type ClientNotificationDocument = HydratedDocument<ClientNotification>;

@Schema({
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class ClientNotification {
  // TODO
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client notification must contain a user.'],
    autopopulate: true,
  })
  user: User;

  @Prop({
    type: Object,
    required: [true, 'Client notification must contain a subscription.'],
  })
  subscription: ClientNotificationSubscription;
}

export const ClientNotificationSchema =
  SchemaFactory.createForClass(ClientNotification);
