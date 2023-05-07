import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Auth from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import AuthorizeReponseDto from './dto/AuthorizeReponse.dto';
import { JwtService } from '../services/jwt.service';
import CreateAuthDto from './dto/CreateAuth.dto';
import { User } from '../types/User';
import UpdateAuthDto from './dto/UpdateAuth.dto';
import ChangePasswordDto from './dto/ChangePassword.dto';
import { MailService } from '../mail/mail.service';
import RecreatePasswordDto from './dto/RecreatePassword.dto';
import ForgetPasswordDto from './dto/ForgetPassword.dto';
import { RecreatePassService } from '../recreate-pass/recreate-pass.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly recreatePassService: RecreatePassService,
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

  update(dto: UpdateAuthDto) {
    return this.authRepository.update(dto.id, dto);
  }

  async changePassword(user: User, dto: ChangePasswordDto) {
    const isPasswordEqual = await compare(dto.oldPassword, user.auth.password);
    if (!isPasswordEqual) {
      throw new BadRequestException(
        'Старый пароль не совпадает с действительным.',
      );
    }

    try {
      user.auth.password = dto.newPassword;
      await this.authRepository.update(user.auth.id, user.auth);
    } catch {
      throw new BadRequestException('Произошла ошибка при смене пароля');
    }
  }

  async forgetPassword({ login }: ForgetPasswordDto) {
    const auth = await this.findAuthByLogin(login);
    if (!auth) {
      throw new BadRequestException(
        'Пользователя с таким емэйлом не существует',
      );
    }

    const token = this.jwtService.signRecreateToken(auth);
    await this.recreatePassService.add({ token, login });
    return this.mailService.recreatePassword(auth, token);
  }

  async recreatePassword({ password, token }: RecreatePasswordDto) {
    const { data } = this.jwtService.verifyRecreateToken(token);
    const [auth, recreateToken] = await Promise.all([
      this.getAuthByIdAndRole(data),
      this.recreatePassService.isExist(token),
    ]);

    if (!auth || !recreateToken) {
      throw new ForbiddenException('Не валидный токен');
    }

    auth.password = password;
    this.recreatePassService.delete(recreateToken.id);
    return this.authRepository.update(auth.id, auth);
  }
}
