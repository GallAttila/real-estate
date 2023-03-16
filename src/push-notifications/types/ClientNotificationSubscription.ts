interface ClientNotificationSubscriptionKeys {
  p256dh: string;
  auth: string;
}

interface ClientNotificationSubscription {
  endpoint: string;
  keys: ClientNotificationSubscriptionKeys;
}

export { ClientNotificationSubscription, ClientNotificationSubscriptionKeys };
