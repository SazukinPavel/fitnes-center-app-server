import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../guards/auth.guard';
import { ExercisesService } from './exercises.service';
import AddExerciseDto from './dto/AddExercise.dto';
import { GetUser, Roles } from '../decorators';
import { User } from '../types/User';
import UpdateIsPayed from './dto/UpdateIsPayed';
import AddCancellationDto from './dto/AddCancellation.dto';

@Controller('exercises')
@UseGuards(RolesGuard)
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}
  @Get()
  @Roles('user')
  getExercises(@GetUser() { role, id }: User) {
    if (role === 'manager') {
      return this.exercisesService.getByManager(id);
    } else if (role === 'client') {
      return this.exercisesService.getByClient(id);
    } else if (role === 'admin') {
      return this.exercisesService.getAll();
    }
  }

  @Get(':id')
  @Roles('user')
  getById(@Param('id') id: string) {
    return this.exercisesService.getById(id);
  }

  @Post()
  @Roles('manager')
  add(@Body() addExerciseDto: AddExerciseDto, @GetUser() user: User) {
    return this.exercisesService.add(addExerciseDto, user);
  }

  @Delete(':id')
  @Roles('manager', 'admin')
  delete(@Param('id') id: string, @GetUser() { role, id: userId }: User) {
    if (role === 'manager') {
      return this.exercisesService.deleteByManager(id, userId);
    } else if (role === 'admin') {
      return this.exercisesService.delete(id);
    }
  }

  @Patch('is-payed')
  @Roles('manager', 'admin')
  updateExerciseIsPayed(@Body() dto: UpdateIsPayed) {
    return this.exercisesService.updateExercisePayed(dto);
  }

  @Patch('cancel')
  @Roles('user')
  addCancellation(@Body() dto: AddCancellationDto) {
    return this.exercisesService.addCancellation(dto);
  }
}
