import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

export interface User {
    id: number,
    name: string
}

@Injectable()
export class UserService {
    constructor(private readonly helloService: HelloService){}

    getAllUsers(): User[] {
        return [
            {id: 1, name: 'Julia'},
            {id: 2, name: 'John'},
            {id: 3, name: 'Marc'},
        ]
    }

    getUserById(id: number): User {
        const user =  this.getAllUsers().find(user => user.id == id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    getWelcomeMessage(id: number): string {
        const user = this.getUserById(id);
        return this.helloService.getHelloWithName(user?.name);
    }
}
