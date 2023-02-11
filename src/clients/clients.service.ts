import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(User) private clientsRepository: Repository<User>,
  ) {}

  findByLogin(login: string) {
    return this.clientsRepository.findOne({ where: { login } });
  }
}
