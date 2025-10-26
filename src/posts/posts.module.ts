import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Post]),
      PassportModule,
      JwtModule.register({}),
      AuthModule
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
