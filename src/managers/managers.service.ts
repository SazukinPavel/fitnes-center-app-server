import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Manager from '../entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
  ) {}

  findByLogin(login: string) {
    return this.managerRepository.findOne({ where: { login } });
  }

  add(addManagerDto: any) {
    const user = this.managerRepository.create({ ...addManagerDto });

    return this.managerRepository.save(user);
  }

  delete(id: string) {
    return this.managerRepository.delete(id);
  }

  update(id, updateManagerDto: any) {
    return this.managerRepository.update(id, updateManagerDto);
  }

  get(id) {
    return this.managerRepository.findOne({ where: { id } });
  }
}
