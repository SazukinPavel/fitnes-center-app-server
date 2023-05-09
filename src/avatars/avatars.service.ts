import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Avatar from '../entities/avatar.entity';
import AddAvatarDto from './dto/AddAvatar.dto';
import { AuthService } from '../auth/auth.service';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarsRepo: Repository<Avatar>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async add(dto: AddAvatarDto) {
    const auth = await this.authService.getAuthById(dto.owner);
    if (!auth) {
      throw new BadRequestException('Такого пользователя несуществует');
    }

    if (auth.avatar && auth.avatar.id) {
      await this.delete(auth.avatar.id);
    }

    const avatar = this.avatarsRepo.create({
      auth: { id: dto.owner },
      name: dto.fileName,
    });

    return this.avatarsRepo.save(avatar);
  }

  async delete(id: string) {
    const avatar = await this.avatarsRepo.findOneBy({ id });
    fs.unlink(
      path.join(this.configService.get('UPLOAD_LOCATION'), avatar.name),
      function (err) {
        if (err) {
          throw new BadRequestException(err.message);
        }
      },
    );
    return this.avatarsRepo.delete(id);
  }
}
