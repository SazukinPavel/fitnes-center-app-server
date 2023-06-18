import { Module } from "@nestjs/common";
import { RecreatePassService } from "./recreate-pass.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import RecreatePass from "../entities/recreate-pass.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecreatePass])],
  exports: [RecreatePassService],
  providers: [RecreatePassService]
})
export class RecreatePassModule {
}
