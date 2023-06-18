import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { DietsService } from "./diets.service";
import AddDietDto from "./dto/AddDiet.dto";
import UpdateDietDto from "./dto/UpdateDiet.dto";
import { Roles } from "../decorators";
import { RolesGuard } from "../guards/auth.guard";

@Controller("diets")
@UseGuards(RolesGuard)
export class DietsController {
  constructor(private dietsService: DietsService) {
  }

  @Post()
  @Roles("admin")
  add(@Body() addDietDto: AddDietDto) {
    return this.dietsService.add(addDietDto);
  }

  @Get()
  @Roles("user")
  getAll() {
    return this.dietsService.getAll();
  }

  @Get(":id")
  @Roles("user")
  getById(@Param("id") id: string) {
    return this.dietsService.getById(id);
  }

  @Delete(":id")
  @Roles("admin")
  deleteById(@Param("id") id: string) {
    return this.dietsService.delete(id);
  }

  @Put()
  @Roles("admin")
  update(@Body() updateDietDto: UpdateDietDto) {
    return this.dietsService.update(updateDietDto);
  }
}
