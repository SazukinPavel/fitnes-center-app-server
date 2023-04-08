import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from '../types/Role';
import Auth from './auth.entity';

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Auth, { cascade: true })
  @JoinColumn()
  auth: Auth;

  readonly role: Role = 'admin';
}
