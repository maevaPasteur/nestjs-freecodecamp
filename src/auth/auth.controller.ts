import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {User, UserRole} from "./entities/user.entity";
import {AuthService} from "./auth.service";
import {JwtAuthGuards} from "./guards/jwt-auth.guards";
import {CurrentUser} from "./decorators/current-user.decorators";
import {Roles} from "./decorators/roles.decorators";
import {RolesGuards} from "./guards/roles.guards";
import {LoginThrottlerGuard} from "./guards/login-throttler.guards";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() registerUserData: RegisterDto): Promise<{message: string, user: User}> {
        return this.authService.register(registerUserData);
    }

    @UseGuards(LoginThrottlerGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginUserData: LoginDto): Promise<{user: User, accessToken: string, refreshToken: string}> {
        return this.authService.login(loginUserData);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Body('refreshToken') refreshToken: string): Promise<{accessToken: string}> {
        return this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuards)
    @Get('profile')
    getProfile(@CurrentUser() user: any) {
        return user;
    }


    @Post('admin/register')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuards, RolesGuards)
    @HttpCode(HttpStatus.CREATED)
    registerAdmin(@Body() registerUserData: RegisterDto): Promise<{message: string, user: User}> {
        return this.authService.registerAdmin(registerUserData);
    }
}
