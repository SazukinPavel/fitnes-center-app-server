import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import AuthorizeReponseDto from './dto/AuthorizeReponse.dto';
import { JwtService } from '../services/jwt.service';
import CreateAuthDto from './dto/CreateAuth.dto';
import { User } from '../types/User';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.getAuth(loginDto.login);

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

    return this.getAuthorize({ auth: user } as User);
  }

  getAuth(login: string) {
    return this.authRepository.findOne({ where: { login } });
  }

  async checkIsLoginBlocked(login: string) {
    if (await this.findAuthByLogin(login)) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует.',
      );
    }
  }

  deleteAuthById(id: string) {
    return this.authRepository.delete({ id });
  }

  findAuthByLogin(login: string) {
    return this.authRepository.findOneBy({ login });
  }

  getAuthByIdAndRole({ id, role }) {
    return this.authRepository.findOneBy({ id, role });
  }

  addAuth(dto: CreateAuthDto) {
    const auth = this.authRepository.create(dto);
    return this.authRepository.save(auth);
  }

  async getAuthorize(user: User): Promise<AuthorizeReponseDto> {
    return { token: this.jwtService.signToken(user.auth), user };
  }
}
