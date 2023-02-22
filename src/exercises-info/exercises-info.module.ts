import { Module } from '@nestjs/common';
import { ExercisesInfoService } from './exercises-info.service';
import { ExercisesInfoController } from './exercises-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ExerciseInfo from '../entities/exercise-info.entity';

@Module({
  providers: [ExercisesInfoService],
  controllers: [ExercisesInfoController],
  imports: [TypeOrmModule.forFeature([ExerciseInfo])],
})
export class ExercisesInfoModule {}
