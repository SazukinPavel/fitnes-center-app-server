import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Diet from '../entities/diet.entity';
import AddDietDto from './dto/AddDiet.dto';
import UpdateDietDto from './dto/UpdateDiet.dto';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(Diet) private dietsRepository: Repository<Diet>,
  ) {}

  async add(addDietDto: AddDietDto) {
    const existedDiet = await this.dietsRepository.findOneBy({
      isActive: true,
      name: addDietDto.name,
    });

    if (existedDiet) {
      throw new BadRequestException('Диета с таким именем уже существует');
    }

    const diet = this.dietsRepository.create({ ...addDietDto });

    return this.dietsRepository.save(diet);
  }

  update(updateDiet: UpdateDietDto) {
    return this.dietsRepository.update(updateDiet.id, updateDiet);
  }

  delete(id: string) {
    return this.dietsRepository.update(id, { isActive: false });
  }

  getById(id: string) {
    return this.dietsRepository.findOneBy({ id });
  }

  getAll() {
    return this.dietsRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
