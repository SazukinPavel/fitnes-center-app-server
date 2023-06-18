import { Module } from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { ManagersController } from "./managers.controller";
import Manager from "../entities/manager.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ManagersService],
  controllers: [ManagersController],
  imports: [TypeOrmModule.forFeature([Manager]), AuthModule],
  exports: [ManagersService]
})
export class ManagersModule {
}
