import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({
    message: 'username is required.',
  })
  @MinLength(6, {
    message: 'username should be longer than 6 letters',
  })
  @MaxLength(20, {
    message: 'username should be shorter than 20 letters',
  })
  username: string;

  @MinLength(6, {
    message: 'password should be longer than 6 letters',
  })
  @MaxLength(20, {
    message: 'password should be shorter than 20 letters',
  })
  password: string;
}

export interface JWTPayloadDto {
  username: string;
  app: string;
  expiresIn: number;
  iat: number;
}
