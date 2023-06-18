import { Module } from "@nestjs/common";
import { DietsController } from "./diets.controller";
import { DietsService } from "./diets.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Diet from "../entities/diet.entity";

@Module({
  controllers: [DietsController],
  providers: [DietsService],
  imports: [TypeOrmModule.forFeature([Diet])]
})
export class DietsModule {
}
