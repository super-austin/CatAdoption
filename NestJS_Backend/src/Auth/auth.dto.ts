export interface AuthDto {
  username: string;
  password: string;
}

export interface JWTPayloadDto {
  username: string;
  app: string;
  expiresIn: number;
  iat: number;
}
