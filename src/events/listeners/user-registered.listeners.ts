import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { UserRegisteredEvent } from "../user-events.service";

@Injectable()
export class UserRegisteredListeners {
  private readonly logger = new Logger(UserRegisteredListeners.name);

  @OnEvent('user.registered')
  handleUserRegistered(event: UserRegisteredEvent): void {
    const {user, timeStamp} = event;

    // Send email / verify email
    this.logger.log(`Welcome ${user.name}! Your account created at ${timeStamp.toISOString()}`);
  }
}