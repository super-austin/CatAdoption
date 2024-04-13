import { NestFactory } from '@nestjs/core';
import { UserModule } from './User/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
