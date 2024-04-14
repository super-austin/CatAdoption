import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../Auth/auth.service';
import { environmentVariables } from '../common.const';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentVariables.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const result = this.authService.validateUser(payload);
    if (!result) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
