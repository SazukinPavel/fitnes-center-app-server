import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';

@Module({
  providers: [ExercisesService],
  controllers: [ExercisesController],
  imports: [TypeOrmModule.forFeature([Exercise])],
})
export class ExercisesModule {}
