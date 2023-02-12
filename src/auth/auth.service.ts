import { HttpException, Injectable } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { AdminsService } from '../admins/admins.service';
import { ManagersService } from '../managers/managers.service';
import Role from '../types/Role';
import { User } from '../entities/user.entity';
import { compare } from 'bcryptjs';
import AuthorizeReponseDto from './dto/AuthorizeReponse.dto';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private clientsService: ClientsService,
    private adminsService: AdminsService,
    private managersService: ManagersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.getUser(loginDto.login);

    if (!user) {
      throw new HttpException('Wrong creditianals', 401);
    }

    const isPasswordCorrect = await new Promise<boolean>((resolve, reject) => {
      compare(loginDto.password, user.password, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    if (!isPasswordCorrect) {
      throw new HttpException('Wrong password', 401);
    }

    return this.getAuthorize(user);
  }

  getAuth(login: string) {
    return this.authRepository.findOne({ where: { login } });
  }

  addAuth(user: User, role: Role) {
    const auth = this.authRepository.create({ ...user, role });
    return this.authRepository.save(auth);
  }

  async getUser(login: string): Promise<User> | undefined {
    const auth = await this.getAuth(login);
    if (!auth) {
      const client = await this.clientsService.findByLogin(login);
      const manager = await this.clientsService.findByLogin(login);
      const admin = await this.clientsService.findByLogin(login);
      const user: User = client || manager || admin;
      if (!user) {
        return;
      }

      this.addAuth(user, user.role);
      return user;
    } else {
      switch (auth.role) {
        case 'client': {
          return this.clientsService.findByLogin(login);
        }
        case 'manager': {
          return this.managersService.findByLogin(login);
        }
        case 'admin': {
          return this.adminsService.findByLogin(login);
        }
      }
    }
  }

  getAuthorize(user: User): AuthorizeReponseDto {
    return { token: this.jwtService.signToken(user), user };
  }
}
