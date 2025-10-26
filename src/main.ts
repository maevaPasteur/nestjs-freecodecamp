import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // stripe properties without decorator,
        forbidNonWhitelisted: true, // reject request if unauthorized properties
        transform: true, // automatically transform payload into object type from dto class
        disableErrorMessages: false,
      })
  )

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
