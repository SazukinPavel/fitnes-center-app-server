import { Body, Controller, Post } from '@nestjs/common';
import AddClientDto from './dto/AddClient.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
  @Post()
  add(@Body() addClientDto: AddClientDto) {
    return this.clientsService.add(addClientDto);
  }
}
