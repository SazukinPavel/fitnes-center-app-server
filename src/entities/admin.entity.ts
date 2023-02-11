import { User } from './user.entity';
import { Entity } from 'typeorm';
import Role from '../types/Role';

@Entity()
export default class Admin extends User {
  readonly role: Role = 'admin';
}
