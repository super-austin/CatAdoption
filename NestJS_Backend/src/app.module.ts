import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { CatsController } from './Cats/cats.controller';
import { CatsService } from './Cats/cats.service';
import { JWTStrategy } from './auth-utils/auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    PassportModule,
  ],
  controllers: [AuthController, CatsController],
  providers: [AuthService, CatsService, JWTStrategy],
})
export class AppModule {}
