import { Column } from 'typeorm';
import Role from '../types/Role';

export default class Auth {
  @Column()
  login: string;

  @Column()
  id: string;

  @Column()
  role: Role;
}
