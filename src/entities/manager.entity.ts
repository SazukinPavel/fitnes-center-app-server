import { User } from './user.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import Client from './client.entity';

@Entity()
export default class Manager extends User {
  @Column({ nullable: true })
  age: number;
  @OneToMany(() => Client, (photo) => photo.owner)
  clients: Client[];
}
