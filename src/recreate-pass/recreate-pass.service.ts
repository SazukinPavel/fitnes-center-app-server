import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RecreatePass from '../entities/recreate-pass.entity';
import AddRecreatePassDto from './dto/AddRecreatePass.dto';

@Injectable()
export class RecreatePassService {
  constructor(
    @InjectRepository(RecreatePass)
    private readonly recreatePassRepo: Repository<RecreatePass>,
  ) {}

  getByToken(token: string) {
    return this.recreatePassRepo.findOneBy({ token });
  }

  delete(id: string) {
    return this.recreatePassRepo.delete(id);
  }

  deleteAllWithLogin(login: string) {
    return this.recreatePassRepo.delete({ login });
  }

  async isExist(token: string) {
    const recreateToken = await this.getByToken(token);
    if (!recreateToken) {
      throw new BadRequestException('Такого токена не существует');
    }

    return recreateToken;
  }

  async add(dto: AddRecreatePassDto) {
    await this.deleteAllWithLogin(dto.login);

    const recreatePass = this.recreatePassRepo.create(dto);
    return this.recreatePassRepo.save(recreatePass);
  }
}
