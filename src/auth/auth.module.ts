import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from "./strategies/jwt.strategy";
import {RolesGuards} from "./guards/roles.guards";
import { EventsModule } from "../events/events.module";
import { LoggerMiddleware } from "../common/middleware/logging.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({}),
    EventsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuards]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // Apply middleware for all routes
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
