import { DogEntity } from './dog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
