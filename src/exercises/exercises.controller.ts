import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Roles } from '../decorators';
import { RolesGuard } from '../guards/auth.guard';
import { User } from '../entities/user.entity';
import { ExercisesService } from './exercises.service';
import AddExerciseDto from './dto/AddExercise.dto';

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
}
