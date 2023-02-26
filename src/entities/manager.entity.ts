import { User } from './user.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import Role from '../types/Role';
import { Exercise } from './exercise.entity';
import Client from './client.entity';

@Entity()
export default class Manager extends User {
  readonly role: Role = 'manager';

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  description:string

  @OneToMany(() => Client, (client) => client.owner)
  clients: Client[];

  @OneToMany(() => Exercise, (exercise) => exercise.manager)
  @JoinColumn()
  exercises: Exercise[];
}