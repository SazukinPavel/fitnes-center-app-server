import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import Manager from '../entities/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ManagersService],
  controllers: [ManagersController],
  imports: [TypeOrmModule.forFeature([Manager])],
})
export class ManagersModule {}
