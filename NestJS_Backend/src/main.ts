import { NestFactory } from '@nestjs/core';
import { AuthModule } from './Auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
