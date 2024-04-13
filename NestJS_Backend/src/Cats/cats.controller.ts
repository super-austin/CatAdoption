import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import { Cats } from './cats.dto';
import { JWTAuthGuard } from 'src/auth-utils/auth.guard';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/health')
  testHealth(): string {
    return this.catsService.testHealth();
  }

  @UseGuards(JWTAuthGuard)
  @Get('/')
  getAllCats(): Cats[] {
    return this.catsService.getAllCats();
  }

  @UseGuards(JWTAuthGuard)
  @Post('/')
  createAllCats(@Body(new ValidationPipe()) { name, age, color, type }: Cats) {
    return this.catsService.createAllCats(name, age, color, type);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/:id')
  getCatsById(@Param('id') id: string) {
    return this.catsService.getCatsById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Put('/:id')
  updateCatsById(
    @Param('id') id: string,
    @Body(new ValidationPipe()) cat: Partial<Cats>,
  ) {
    return this.catsService.updateCatsById(id, cat);
  }
}
