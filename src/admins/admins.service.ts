import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admin from '../entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  findByLogin(login: string) {
    return this.adminRepository.findOne({ where: { login } });
  }
}
