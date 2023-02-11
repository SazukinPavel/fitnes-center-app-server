import { User } from './user.entity';
import { Entity } from 'typeorm';

@Entity()
export default class Admin extends User {}
