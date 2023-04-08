import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import AddClientDto from './dto/AddClient.dto';
import { ClientsService } from './clients.service';
import { RolesGuard } from '../guards/auth.guard';
import UpdateClientDto from './dto/UpdateClient.dto';
import SetDietDto from './dto/SetDiet.dto';
import { GetUser, Roles } from '../decorators';
import Manager from '../entities/manager.entity';
import { User } from '../types/User';

@Controller('clients')
@UseGuards(RolesGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @Roles('manager')
  add(@Body() addClientDto: AddClientDto, @GetUser() manager: Manager) {
    return this.clientsService.add(addClientDto, manager);
  }

  @Get()
  @Roles('manager', 'admin')
  get(@GetUser() user: User) {
    if (user.role === 'admin') {
      return this.clientsService.getAll();
    } else {
      return this.clientsService.getAllByManager(user as Manager);
    }
  }

  @Get(':id')
  @Roles('user')
  getById(@Param('id') id: string) {
    return this.clientsService.getById(id);
  }

  @Put()
  @Roles('manager', 'admin', 'client')
  update(@Body() updateClientDto: UpdateClientDto, @GetUser() user: User) {
    if (user.role === 'client' && user.id != updateClientDto.id) {
      throw new ForbiddenException('You dont have this right!');
    }
    return this.clientsService.updateClient(updateClientDto);
  }

  @Patch()
  @Roles('manager', 'admin')
  setDiet(@Body() setDietdto: SetDietDto) {
    return this.clientsService.setDiet(setDietdto);
  }

  @Delete(':id')
  @Roles('admin', 'manager')
  delete(@Param('id') id: string, @GetUser() user: User) {
    if (user.role === 'admin') {
      return this.clientsService.deleteWithoutCheck(id);
    } else {
      return this.clientsService.delete(id, user.id);
    }
  }
}
