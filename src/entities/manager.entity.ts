import { User } from './user.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import Client from './client.entity';
import Role from '../types/Role';

@Entity()
export default class Manager extends User {
  readonly role: Role = 'manager';

  @Column({ nullable: true })
  age: number;
  @OneToMany(() => Client, (photo) => photo.owner)
  clients: Client[];
}
