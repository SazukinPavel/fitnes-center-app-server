import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Client from './client.entity';

@Entity()
export default class Diet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Client, (client) => client.diet)
  clients: Client[];
}
