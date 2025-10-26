import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

// protect routes that require authentification

@Injectable()
export class JwtAuthGuards extends AuthGuard('jwt') {}