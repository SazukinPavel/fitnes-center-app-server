import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Client from './client.entity';
import Manager from './manager.entity';

@Entity()
export abstract class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => Client, (client) => client.exercises)
  client: Client;

  @ManyToOne(() => Manager, (manager) => manager.exercises)
  manager: Manager;
}
