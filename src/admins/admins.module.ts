import { Module } from "@nestjs/common";
import { AdminsController } from "./admins.controller";
import { AdminsService } from "./admins.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Admin from "../entities/admin.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [TypeOrmModule.forFeature([Admin]), AuthModule],
  exports: [AdminsService]
})
export class AdminsModule {
}
