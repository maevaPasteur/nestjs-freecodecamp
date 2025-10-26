import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    private generateAccessToken(user: User): string {
        // -> email - sub(id), role -> vvvI -> RBAC -> User ? Admin
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        }
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwtSecret'),
            expiresIn: '15m'
        })
    }

    private generateRefreshToken(user: User): string {
        const payload = {sub: user.id};
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwtRefresh'),
            expiresIn: '7d'
        })
    }

    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private async verifyPassword(loginPassword: string, userHashedPassword: string): Promise<boolean> {
        return bcrypt.compare(loginPassword, userHashedPassword);
    }

    private async getUserByEmail(email: string): Promise<User|null> {
        return this.userRepository.findOne({where: {email}});
    }

    async getUserById(id: number): Promise<User|null> {
        return this.userRepository.findOne({where: {id}});
    }

    private async createUser(registerDto: RegisterDto, role: UserRole): Promise<User> {
        const existingUser = await this.getUserByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already used, please try an other one!')
        }
        const hashedPassword = await this.hashPassword(registerDto.password);
        const newUser = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: role,
        });
        const savedUser = await this.userRepository.save(newUser);
        return omit(savedUser, ['password']);
    }

    async register(registerDto: RegisterDto): Promise<{user: User, message: string}> {
        const newUser = await this.createUser(registerDto, UserRole.USER);
        return {
            user: newUser,
            message: 'Registration successfully! Pleas login to continue'
        }
    }

    async registerAdmin(registerDto: RegisterDto): Promise<{user: User, message: string}> {
        const newUser = await this.createUser(registerDto, UserRole.ADMIN);
        return {
            user: newUser,
            message: 'Registration admin successfully! Pleas login to continue'
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.getUserByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const passwordIsValid = await this.verifyPassword(loginDto.password, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException("Invalid credentials")
        }
        return {
            user: omit(user, ['password']),
            ...this.generateTokens(user),
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('jwtRefresh'),
            });
            const user = await this.getUserById(payload.sub);
            if (!user) {
                throw new UnauthorizedException('Invalid token')
            }
            return {
                accessToken: this.generateAccessToken(user)
            }
        } catch(e) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}
