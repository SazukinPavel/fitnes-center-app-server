import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Manager from '../entities/manager.entity';
import AddManagerDto from './dto/AddManager.dto';
import UpdateManagerDto from './dto/UpdateManager.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    private authService: AuthService,
  ) {}

  getById(id) {
    return this.managerRepository.findOneBy({ id });
  }

  getAll() {
    return this.managerRepository.find({
      relations: ['auth', 'auth.avatar'],
      order: { auth: { createdAt: 'DESC' } },
    });
  }

  getByAuthId(authId: string) {
    return this.managerRepository.findOne({
      where: { auth: { id: authId } },
      relations: ['auth', 'auth.avatar'],
    });
  }

  async add(addManagerDto: AddManagerDto) {
    await this.authService.checkIsLoginBlocked(addManagerDto.login);

    const auth = await this.authService.addAuth({
      ...addManagerDto,
      role: 'manager',
    });

    const manager = this.managerRepository.create({ ...addManagerDto, auth });

    return await this.managerRepository.save(manager);
  }

  async update(updateManagerDto: UpdateManagerDto) {
    await this.authService.update({
      id: updateManagerDto.authId,
      fio: updateManagerDto.fio,
      telephone: updateManagerDto.telephone,
    });

    return this.managerRepository.update(updateManagerDto.id, {
      description: updateManagerDto.description,
    });
  }

  async delete(id: string) {
    const mamager = await this.getById(id);

    const result = await this.managerRepository.delete(id);
    await this.authService.deleteAuthById(mamager.auth.id);
    return result;
  }

  changeDescription(id: string, description: string) {
    return this.managerRepository.update(id, { description });
  }
}
