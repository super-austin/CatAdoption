import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  cats = [];

  testHealth(): string {
    return 'Cats Service is working!';
  }
}
