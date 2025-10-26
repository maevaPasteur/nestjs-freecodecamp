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
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from "@nestjs/throttler";
import { CacheModule } from "@nestjs/cache-manager";

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
      entities: [Post, User],
      synchronize: process.env.mode === 'dev', // dev mode only
    }),
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
