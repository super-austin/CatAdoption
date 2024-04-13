import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  testHealth(): string {
    return 'User Service is working!';
  }
}
