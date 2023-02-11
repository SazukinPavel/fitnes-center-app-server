import { Injectable } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { AdminsService } from '../admins/admins.service';
import { ManagersService } from '../managers/managers.service';
import Role from '../types/Role';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private clientsService: ClientsService,
    private adminsService: AdminsService,
    private managersService: ManagersService,
  ) {}
  login(loginDto: LoginDto) {}

  getAuth({ login }: LoginDto) {
    return this.authRepository.findOne({ where: { login } });
  }

  addAuth(user: User, role: Role) {
    const auth = this.authRepository.create({ ...user, role });
    return this.authRepository.save(auth);
  }

  async getUserType(loginDto: LoginDto): Promise<Role> | undefined {
    const auth = await this.getAuth(loginDto);
    if (!auth) {
      const client = await this.clientsService.findByLogin(loginDto.login);
      const manager = await this.clientsService.findByLogin(loginDto.login);
      const admin = await this.clientsService.findByLogin(loginDto.login);
      const user: User = client || manager || admin;
      if (!user) {
        return;
      }

      return (await this.addAuth(user, user.role)).role;
    } else {
      return auth.role;
    }
  }
}
