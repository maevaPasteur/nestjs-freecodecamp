import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // stripe properties without decorator,
      forbidNonWhitelisted: true, // reject request if unauthorized properties
      transform: true, // automatically transform payload into object type from dto class
      disableErrorMessages: false,
    })
  )

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
