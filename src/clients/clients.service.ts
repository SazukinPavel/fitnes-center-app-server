import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Client from '../entities/client.entity';
import AddClientDto from './dto/AddClient.dto';
import Manager from '../entities/manager.entity';
import UpdateClientDto from './dto/UpdateClient.dto';
import SetDietDto from './dto/SetDiet.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  findByLogin(login: string) {
    return this.clientsRepository.findOneBy({ login });
  }

  add(addClientDto: AddClientDto, manager: Manager) {
    const client = this.clientsRepository.create({
      ...addClientDto,
      owner: manager,
    });

    return this.clientsRepository.save(client);
  }

  getById(id: string) {
    return this.clientsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  getAllByManager(owner: Manager) {
    return this.clientsRepository.find({
      where: { owner: { id: owner.id } },
      relations: ['diet'],
    });
  }

  getAll() {
    return this.clientsRepository.find();
  }

  updateClient(updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    
    return this.clientsRepository.update(updateClientDto.id, updateClientDto);
  }

  setDiet({ clientId, dietId }: SetDietDto) {
    return this.clientsRepository.update(clientId, { diet: { id: dietId } });
  }

  async delete(id: string, managerId: string) {
    const client = await this.getById(id);

    if (!client) {
      throw new NotFoundException('User with this id not founded!');
    }

    if (client.owner.id != managerId) {
      throw new ForbiddenException('You not owner of this client!');
    }

    return this.deleteWithoutCheck(id);
  }

  deleteWithoutCheck(id: string) {
    return this.clientsRepository.delete(id);
  }
}
