import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Admin from "../entities/admin.entity";
import AddAdminDto from "./dto/AddAdmin.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private authService: AuthService
  ) {
  }

  async add(addAdminDto: AddAdminDto) {
    await this.authService.checkIsLoginBlocked(addAdminDto.login);
    const auth = await this.authService.addAuth({
      ...addAdminDto,
      role: "admin",
      fio: "",
      telephone: ""
    });

    const admin = this.adminRepository.create({
      ...addAdminDto,
      role: "admin",
      auth
    });

    return await this.adminRepository.save(admin);
  }

  findAdminById(id: string) {
    return this.adminRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const admin = await this.findAdminById(id);
    const result = this.adminRepository.delete(id);
    await this.authService.deleteAuthById(admin.auth.id);
    return result;
  }

  getByAuthId(authId: string) {
    return this.adminRepository.findOne({
      where: { auth: { id: authId } },
      relations: ["auth"]
    });
  }
}
