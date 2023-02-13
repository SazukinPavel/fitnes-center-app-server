import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Manager from '../entities/manager.entity';
import AddManagerDto from './dto/AddManager.dto';
import UpdateManagerDto from './dto/UpdateManager.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
  ) {}
  getById(id) {
    return this.managerRepository.findOne({ where: { id } });
  }

  getAll() {
    return this.managerRepository.find();
  }
  findByLogin(login: string) {
    return this.managerRepository.findOne({ where: { login } });
  }

  add(addManagerDto: AddManagerDto) {
    const manager = this.managerRepository.create(addManagerDto);

    return this.managerRepository.save(manager);
  }
  update(updateManagerDto: UpdateManagerDto) {
    return this.managerRepository.update(updateManagerDto.id, updateManagerDto);
  }

  delete(id: string) {
    return this.managerRepository.delete(id);
  }
}
