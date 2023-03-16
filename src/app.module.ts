import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RealEstateModule } from './real-estates/real-estate.module';
import { UsersModule } from './users/users.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import MongooseAutopopulate from 'mongoose-autopopulate';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        connectionFactory: (connection: any) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
    }),
    RealEstateModule,
    AuthModule,
    UsersModule,
    PushNotificationsModule,
  ],
})
export class AppModule {}
