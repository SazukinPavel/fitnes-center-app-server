import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/auth.guard';
import { Roles } from '../decorators';
import AddCancellationDto from './dto/AddCancellation.dto';
import { CancellationService } from './cancellation.service';

@Controller('cancellation')
@UseGuards(RolesGuard)
@Roles('user')
export class CancellationController {
  constructor(private cancellationService: CancellationService) {}

  @Post()
  add(@Body() dto: AddCancellationDto) {
    return this.cancellationService.add(dto);
  }
}
