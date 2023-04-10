import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Client from '../entities/client.entity';
import AddClientDto from './dto/AddClient.dto';
import UpdateClientDto from './dto/UpdateClient.dto';
import SetDietDto from './dto/SetDiet.dto';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import Manager from '../entities/manager.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    private authService: AuthService,
  ) {}

  async add(addClientDto: AddClientDto, manager: Manager) {
    await this.authService.checkIsLoginBlocked(addClientDto.login);

    const auth = await this.authService.addAuth({
      ...addClientDto,
      role: 'client',
    });

    const client = this.clientsRepository.create({
      ...addClientDto,
      owner: manager,
      auth,
    });

    return this.clientsRepository.save(client);
  }

  getById(id: string) {
    return this.clientsRepository.findOne({
      where: { id },
      relations: ['owner', 'diet', 'exercises', 'auth'],
    });
  }

  getByAuthId(authId: string) {
    return this.clientsRepository.findOne({
      where: { auth: { id: authId } },
      relations: ['auth'],
    });
  }

  getAllByManager(auth: Manager) {
    return this.clientsRepository.find({
      where: { owner: { id: auth.id } },
      relations: ['diet', 'auth'],
    });
  }

  getAll() {
    return this.clientsRepository.find();
  }

  async updateClient({ authId, id, fio, height, weight }: UpdateClientDto) {
    await this.authService.update({
      fio,
      id: authId,
    });

    return this.clientsRepository.update(id, {
      height,
      weight,
    });
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

  async deleteWithoutCheck(id: string) {
    const authId = (await this.getById(id)).auth.id;
    const result = await this.clientsRepository.delete(id);
    await this.authService.deleteAuthById(authId);
    return result;
  }
}
