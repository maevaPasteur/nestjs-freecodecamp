import {Injectable, CanActivate, ExecutionContext, ForbiddenException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UserRole} from "../entities/user.entity";
import {ROLES_KEY} from "../decorators/roles.decorators";

// protect routes that require authentification

@Injectable()
export class RolesGuards implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [
                context.getHandler(), // method level metadata
                context.getClass(), // class level metadata
            ]
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('User not authenticated')
        }

        const hasRequiredRole = requiredRoles.some(role => user.role === role);

        if (!hasRequiredRole) {
            throw new ForbiddenException('User not authenticated')
        }

        return true;
    }
}