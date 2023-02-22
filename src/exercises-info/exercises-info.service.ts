import { Injectable } from '@nestjs/common';
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

  add(addExerciseInfoDto: AddExerciseInfoDto) {
    const exerciseInfo = this.exerciseInfoRepository.create(addExerciseInfoDto);

    return this.exerciseInfoRepository.save(exerciseInfo);
  }

  getById(id: string) {
    return this.exerciseInfoRepository.findOneBy({ id });
  }

  getAll() {
    return this.exerciseInfoRepository.find();
  }

  update(updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseInfoRepository.update(
      updateExerciseDto.id,
      updateExerciseDto,
    );
  }

  delete(id: string) {
    return this.exerciseInfoRepository.delete(id);
  }
}
