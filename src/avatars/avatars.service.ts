import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Avatar from "../entities/avatar.entity";
import AddAvatarDto from "./dto/AddAvatar.dto";
import { AuthService } from "../auth/auth.service";
import * as path from "path";
import { ConfigService } from "@nestjs/config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imgbbUploader = require("imgbb-uploader");

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarsRepo: Repository<Avatar>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
  }

  async add(dto: AddAvatarDto) {
    const auth = await this.authService.getAuthById(dto.owner);
    if (!auth) {
      throw new BadRequestException("Такого пользователя несуществует");
    }

    if (auth.avatar && auth.avatar.id) {
      await this.delete(auth.avatar.id);
    }

    const res = await imgbbUploader({
      apiKey: this.configService.get("IMGDB_KEY"),
      imagePath: path.join(
        this.configService.get("UPLOAD_LOCATION"),
        dto.fileName
      )
    });

    const avatar = this.avatarsRepo.create({
      auth: { id: dto.owner },
      name: res.image.url
    });

    return this.avatarsRepo.save(avatar);
  }

  delete(id: string) {
    return this.avatarsRepo.delete(id);
  }
}
