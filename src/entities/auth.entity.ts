import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Role from '../types/Role';

@Entity()
export default class Auth {
  @PrimaryGeneratedColumn('uuid')
  authId: string;
  @Column()
  login: string;

  @Column()
  id: string;

  @Column()
  role: Role;
}
