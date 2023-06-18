import { Module } from "@nestjs/common";
import { CancellationService } from "./cancellation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Cancellation from "../entities/cancellation.entity.";

@Module({
  providers: [CancellationService],
  imports: [TypeOrmModule.forFeature([Cancellation])],
  exports: [CancellationService]
})
export class CancellationModule {
}
