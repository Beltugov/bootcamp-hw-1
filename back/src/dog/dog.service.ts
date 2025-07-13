import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DogEntity } from './dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogService implements OnModuleInit {
  constructor(
    @InjectRepository(DogEntity)
    private dogRepository: Repository<DogEntity>,
  ) {}

  async onModuleInit() {
    const arr = await this.dogRepository.find();
    if (arr.length > 0) return;
    const dogs: void | string[] = await fetch('https://random.dog/doggos')
      .then((res): Promise<string[]> => res.json())
      .catch((e) => console.log(e));
    if (!dogs) {
      throw new ServiceUnavailableException('Service not working now');
    }
    await this.dogRepository.save(
      dogs.map((elem) => ({
        url: 'https://random.dog/' + elem,
      })),
    );
  }

  public async findAll(page: number = 1): Promise<DogEntity[]> {
    const arr = await this.dogRepository.find();
    const perPage = 20;
    return arr.slice(perPage * page - perPage, perPage * page);
  }

  public async findOneById(id: string): Promise<DogEntity> {
    const dog = await this.dogRepository.findOneBy({ id });
    if (!dog) throw new NotFoundException('Dog not found');
    return dog;
  }

  public async increaseLike(id: string): Promise<DogEntity> {
    const dog = await this.findOneById(id);
    if (!dog) throw new NotFoundException('Dog not found');
    dog.likes++;
    return await this.dogRepository.save(dog);
  }
}
