import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/health')
  testHealth(): string {
    return this.catsService.testHealth();
  }
}
