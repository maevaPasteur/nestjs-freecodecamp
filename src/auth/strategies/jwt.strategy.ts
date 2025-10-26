import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {AuthService} from "../auth.service";
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('jwtSecret'),
            passReqToCallback: false,
        })
    }

    async validate(payload: any) {
        try {
            const user = await this.authService.getUserById(payload.sub);
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }
            return omit(user, ['password'])
        } catch (e) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}