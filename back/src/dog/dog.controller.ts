import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogEntity } from './dog.entity';

@Controller('dog')
export class DogController {
  constructor(private dogService: DogService) {}

  @Get()
  async getAll(@Query('page') pageStr: string): Promise<DogEntity[]> {
    const page = pageStr ? parseInt(pageStr) : 1;
    return await this.dogService.findAll(page);
  }

  @Get('/:dogId')
  async getOne(@Param('authorId') id: string): Promise<DogEntity> {
    return await this.dogService.findOneById(id);
  }

  @Patch('/:dogId')
  async addLike(@Param('dogId') id: string): Promise<DogEntity> {
    return await this.dogService.increaseLike(id);
  }
}
