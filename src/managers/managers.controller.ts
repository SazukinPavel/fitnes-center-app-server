import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../guards/auth.guard';
import { ManagersService } from './managers.service';
import AddManagerDto from './dto/AddManager.dto';
import UpdateManagerDto from './dto/UpdateManager.dto';
import { Roles, GetUser } from '../decorators';
import { User } from '../entities/user.entity';

@Controller('managers')
@UseGuards(RolesGuard)
export class ManagersController {
  constructor(private managerService: ManagersService) {}

  @Get()
  @Roles('user')
  getAll() {
    return this.managerService.getAll();
  }

  @Get(':id')
  @Roles('user')
  get(@Param('id') id: string) {
    return this.managerService.getById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() addManagerDto: AddManagerDto) {
    return this.managerService.add(addManagerDto);
  }

  @Put()
  @Roles('admin', 'manager')
  update(@Body() updateManagerDto: UpdateManagerDto, @GetUser() user: User) {
    if (user.role || user.id === updateManagerDto.id) {
      return this.managerService.update(updateManagerDto);
    }
    throw new HttpException('You dont have this right!', 403);
  }

  @Delete('id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.managerService.delete(id);
  }
}
