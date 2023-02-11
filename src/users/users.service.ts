import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import AddUserDto from './dto/AddUser.dto';
import UpdateUserDto from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  add(addUserDto: AddUserDto) {
    const user = this.usersRepository.create({ ...addUserDto });

    return this.usersRepository.save(user);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }

  update(id, updateDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateDto);
  }

  get(id) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
