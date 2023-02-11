import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import AddUserDto from './dto/AddUser.dto';
import UpdateUserDto from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Post()
  add(@Body() user: AddUserDto) {
    return this.userService.add(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put()
  update(@Body('id') id: string, @Body('user') user: UpdateUserDto) {
    return this.userService.update(id, user);
  }
}
