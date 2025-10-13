import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  //imports: [], // import others modules if need
  exports: [HelloService], // import services if need in others modules
})
export class HelloModule {}
