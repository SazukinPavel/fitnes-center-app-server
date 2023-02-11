import { User } from './user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Manager from './manager.entity';
import Role from '../types/Role';

@Entity()
export default class Client extends User {
  readonly role: Role = 'client';

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  age: number;
  @ManyToOne(() => Manager, (Manager) => Manager.clients)
  owner: Manager;
}
