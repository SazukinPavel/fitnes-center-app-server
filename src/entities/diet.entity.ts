import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Client from './client.entity';

@Entity()
export default class Diet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Client, (client) => client.diet)
  clients: Client[];
}
