import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { LocalStrategy } from './auth-utils/auth.strategy';
import { CatsController } from './Cats/cats.controller';
import { CatsService } from './Cats/cats.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    PassportModule,
  ],
  controllers: [AuthController, CatsController],
  providers: [AuthService, CatsService, LocalStrategy],
})
export class AppModule {}
