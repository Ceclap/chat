import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'utm-chat.postgres.database.azure.com',
      port: 5432,
      username: 'si221@utm-chat',
      password: '@KunfuPanda',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
