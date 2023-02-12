import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Client from '../entities/client.entity';
import AddClientDto from './dto/AddClient.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  findByLogin(login: string) {
    return this.clientsRepository.findOne({ where: { login } });
  }

  add(addClientDto: AddClientDto) {
    const client = this.clientsRepository.create(addClientDto);

    return this.clientsRepository.save(client);
  }
}
