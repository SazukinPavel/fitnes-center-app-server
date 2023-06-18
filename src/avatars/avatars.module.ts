import { Module } from "@nestjs/common";
import { AvatarsService } from "./avatars.service";
import { AvatarsController } from "./avatars.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Avatar from "../entities/avatar.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Avatar]), AuthModule],
  providers: [AvatarsService],
  controllers: [AvatarsController]
})
export class AvatarsModule {
}
