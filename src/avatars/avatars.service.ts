import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Avatar from '../entities/avatar.entity';
import AddAvatarDto from './dto/AddAvatar.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarsRepo: Repository<Avatar>,
    private readonly authService: AuthService,
  ) {}

  async add(dto: AddAvatarDto) {
    console.log(dto);
    const auth = await this.authService.getAuthById(dto.owner);
    console.log(auth);
    if (!auth) {
      throw new BadRequestException('Такого пользователя несуществует');
    }

    console.log(auth, 'auth');
    if (auth.avatar && auth.avatar.id) {
      await this.delete(auth.avatar.id);
    }

    const avatar = this.avatarsRepo.create({
      auth: { id: dto.owner },
      name: dto.fileName,
    });

    console.log('avatar', avatar);
    return this.avatarsRepo.save(avatar);
  }

  delete(id: string) {
    return this.avatarsRepo.delete(id);
  }
}
