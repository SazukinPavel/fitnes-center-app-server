import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DietsService } from './diets.service';
import AddDietDto from './dto/AddDiet.dto';
import UpdateDietDto from './dto/UpdateDiet.dto';

@Controller('diets')
export class DietsController {
  constructor(private dietsService: DietsService) {}

  @Post()
  add(@Body() addDietDto: AddDietDto) {
    return this.dietsService.add(addDietDto);
  }

  @Get()
  getAll() {
    return this.dietsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.dietsService.getById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.dietsService.delete(id);
  }

  @Put()
  update(@Body() updateDietDto: UpdateDietDto) {
    return this.dietsService.update(updateDietDto);
  }
}
