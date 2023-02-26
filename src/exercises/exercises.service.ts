import { ForbiddenException, Injectable } from '@nestjs/common';
import AddExerciseDto from './dto/AddExercise.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}
  add(addExerciseDto: AddExerciseDto, manager: User) {
    const exercie = this.exerciseRepository.create({
      ...addExerciseDto,
      manager: { id: manager.id },
      exerciseInfo: { id: addExerciseDto.exerciseId },
      client: { id: addExerciseDto.clientId },
    });

    return this.exerciseRepository.save(exercie);
  }

  getAll() {
    return this.exerciseRepository.find({
      relations: ['client', 'manager', 'exerciseInfo'],
    });
  }

  getById(id: string) {
    return this.exerciseRepository.findOneBy({ id });
  }

  getByManager(managerId: string) {
    return this.exerciseRepository.find({
      where: { manager: { id: managerId } },
      relations: ['client', 'manager', 'exerciseInfo'],
    });
  }

  getByClient(clientId: string) {
    return this.exerciseRepository.find({
      where: {
        client: { id: clientId },
      },
      relations:['manager','exerciseInfo']
    });
  }

  delete(id: string) {
    return this.exerciseRepository.delete(id);
  }

  async deleteByManager(id: string, managerId: string) {
    const exercise = await this.exerciseRepository.findOne({ where:{id},relations:['manager'] });
    console.log(exercise,managerId);
    
    if (exercise.manager.id == managerId) {
      return this.delete(id);
    }

    throw new ForbiddenException('You not owner of this exersice!');
  }
}
