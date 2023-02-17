import { Injectable } from '@nestjs/common';
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

  add(addDietDto: AddDietDto) {
    const diet = this.dietsRepository.create({ ...addDietDto });

    return this.dietsRepository.save(diet);
  }

  update(updateDiet: UpdateDietDto) {
    return this.dietsRepository.update(updateDiet.id, updateDiet);
  }

  delete(id: string) {
    return this.dietsRepository.delete(id);
  }

  getById(id: string) {
    return this.dietsRepository.findOneBy({ id });
  }

  getAll() {
    return this.dietsRepository.find();
  }
}
