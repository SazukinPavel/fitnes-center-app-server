import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import AddManagerDto from './dto/AddManager.dto';
import UpdateManagerDto from './dto/UpdateManager.dto';

@Injectable()
export class ManagersService {
  protected managerRepository: Repository<any>;

  add(addManagerDto: AddManagerDto) {
    const user = this.managerRepository.create({ ...addManagerDto });

    return this.managerRepository.save(user);
  }

  delete(id: string) {
    return this.managerRepository.delete(id);
  }

  update(id, updateManagerDto: UpdateManagerDto) {
    return this.managerRepository.update(id, updateManagerDto);
  }

  get(id) {
    return this.managerRepository.findOne({ where: { id } });
  }
}
