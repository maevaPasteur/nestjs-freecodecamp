import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { omit } from 'lodash';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return omit(request.user, ['password']);
})