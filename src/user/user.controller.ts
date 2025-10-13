import {Controller, Get, Param} from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id)
    }

    @Get(':id/welcome')
    getWelcomeMessage(@Param('id') id: number) {
        return this.userService.getWelcomeMessage(id)
    }
}
