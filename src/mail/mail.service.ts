import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Auth from '../entities/auth.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async recreatePassword(user: Auth, token) {
    const url = `${this.configService.get(
      'CLIENT_URL',
    )}new-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.login,
      from: '"Fitness app" <p.sazikin@yandex.by>',
      subject: 'Востановление пароля',
      template: './recreatePassword',
      context: {
        name: user.fio,
        url,
      },
    });
  }
}
