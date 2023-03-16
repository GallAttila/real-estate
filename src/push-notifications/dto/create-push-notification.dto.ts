import { ClientNotificationSubscriptionKeys } from '../types/ClientNotificationSubscription';

export class CreatePushNotificationDto {
  endpoint: string;
  keys: ClientNotificationSubscriptionKeys;
}
