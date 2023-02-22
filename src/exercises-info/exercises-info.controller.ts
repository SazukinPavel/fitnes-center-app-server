import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../guards/auth.guard';
import { Roles } from '../decorators';
import { ExercisesInfoService } from './exercises-info.service';
import AddExerciseInfoDto from './dto/AddExerciseInfo.dto';
import UpdateExerciseDto from './dto/UpdateExercise.dto';

@Controller('exercises-info')
@UseGuards(RolesGuard)
@Roles('admin')
export class ExercisesInfoController {
  constructor(private readonly exercisesInfoService: ExercisesInfoService) {}

  @Get()
  getAll() {
    return this.exercisesInfoService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.exercisesInfoService.getById(id);
  }

  @Post()
  add(@Body() addExerciseInfoDto: AddExerciseInfoDto) {
    return this.exercisesInfoService.add(addExerciseInfoDto);
  }

  @Put()
  update(@Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesInfoService.update(updateExerciseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.exercisesInfoService.delete(id);
  }
}
