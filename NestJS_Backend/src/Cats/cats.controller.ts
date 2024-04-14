import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
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
  async getAllCats() {
    return this.catsService.getAllCats();
  }

  @UseGuards(JWTAuthGuard)
  @Post('/')
  async createCats(
    @Body(new ValidationPipe()) { name, age, color, type }: Cats,
  ) {
    return this.catsService.createCats(name, age, color, type);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/:id')
  async getCatsById(@Param('id') id: string) {
    return this.catsService.getCatsById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Put('/:id')
  async updateCatsById(
    @Param('id') id: string,
    @Body(new ValidationPipe()) cat: Partial<Cats>,
  ) {
    return this.catsService.updateCatsById(id, cat);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('/:id')
  async deleteCats(@Param('id') id: string) {
    return this.catsService.deleteCatsById(id);
  }
}
