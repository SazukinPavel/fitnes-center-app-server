import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ExerciseInfo from '../entities/exercise-info.entity';
import AddExerciseInfoDto from './dto/AddExerciseInfo.dto';
import UpdateExerciseDto from './dto/UpdateExercise.dto';

@Injectable()
export class ExercisesInfoService {
  constructor(
    @InjectRepository(ExerciseInfo)
    private exerciseInfoRepository: Repository<ExerciseInfo>,
  ) {}

  async add(addExerciseInfoDto: AddExerciseInfoDto) {
    const existedExerciseInfo = await this.exerciseInfoRepository.findOneBy({
      isActive: true,
      name: addExerciseInfoDto.name,
    });

    if (existedExerciseInfo) {
      throw new BadRequestException(
        'Тип занятия с таким именем уже существует',
      );
    }

    const exerciseInfo = this.exerciseInfoRepository.create(addExerciseInfoDto);

    return this.exerciseInfoRepository.save(exerciseInfo);
  }

  getById(id: string) {
    return this.exerciseInfoRepository.findOneBy({ id });
  }

  getAll() {
    return this.exerciseInfoRepository.find({
      where: { isActive: true },
      order: { createdAt: 'asc' },
    });
  }

  update(updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseInfoRepository.update(
      updateExerciseDto.id,
      updateExerciseDto,
    );
  }

  delete(id: string) {
    return this.exerciseInfoRepository.update(id, { isActive: false });
  }
}
