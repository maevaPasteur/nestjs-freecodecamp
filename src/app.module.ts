import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
//import * as joi from 'joi';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts/entities/post.entity'
import { User } from './auth/entities/user.entity'
import { File } from './file-upload/entities/file.entity'
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from "@nestjs/throttler";
import { CacheModule } from "@nestjs/cache-manager";
import { FileUploadModule } from './file-upload/file-upload.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        }
      ]
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 30000,
      max: 100
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Post, User, File],
      synchronize: process.env.MODE === 'dev', // dev mode only
    }),
    PostsModule,
    AuthModule,
    FileUploadModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
