import { Module } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancellationController } from './cancellation.controller';
import Cancellation from '../entities/cancellation.entity.';

@Module({
  providers: [CancellationService],
  imports: [TypeOrmModule.forFeature([Cancellation])],
  controllers: [CancellationController],
})
export class CancellationModule {}
