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
export class ExercisesInfoController {
  constructor(private readonly exercisesInfoService: ExercisesInfoService) {}

  @Get()
  @Roles('user')
  getAll() {
    return this.exercisesInfoService.getAll();
  }

  @Get(':id')
  @Roles('user')
  getById(@Param('id') id: string) {
    return this.exercisesInfoService.getById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() addExerciseInfoDto: AddExerciseInfoDto) {
    return this.exercisesInfoService.add(addExerciseInfoDto);
  }

  @Put()
  @Roles('admin')
  update(@Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesInfoService.update(updateExerciseDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.exercisesInfoService.delete(id);
  }
}
