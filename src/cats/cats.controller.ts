import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get(':id')
  findOne(@Param() params): string {
    return `This action returns ${params.id} cats`;
  }
  @Post()
  create(): string {
    return 'This action posts a cat';
  }
  @Delete()
  delete(): string {
    return 'This action deletes a cat';
  }
  @Put()
  put(): string {
    return 'This action changes a cat';
  }
}
