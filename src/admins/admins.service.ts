import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admin from '../entities/admin.entity';
import AddAdminDto from './dto/AddAdmin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  findByLogin(login: string) {
    return this.adminRepository.findOneBy({ login });
  }

  add(addAdminDto: AddAdminDto) {
    const admin = this.adminRepository.create({ ...addAdminDto, fio: '' });

    return this.adminRepository.save(admin);
  }

  delete(id: string) {
    return this.adminRepository.delete(id);
  }
}
