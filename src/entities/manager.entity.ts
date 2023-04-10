import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from '../types/Role';
import { Exercise } from './exercise.entity';
import Client from './client.entity';
import Auth from './auth.entity';

@Entity()
export default class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  readonly role: Role = 'manager';

  @OneToOne(() => Auth, { cascade: true })
  @JoinColumn()
  auth: Auth;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Client, (client) => client.owner)
  clients: Client[];

  @OneToMany(() => Exercise, (exercise) => exercise.manager)
  @JoinColumn()
  exercises: Exercise[];
}
