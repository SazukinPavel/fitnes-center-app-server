import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from '../types/Role';
import { hash } from 'bcryptjs';

@Entity()
export default class Auth {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  role: Role;

  @Column()
  fio: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;

      this.password = await new Promise((resolve, reject) => {
        hash(this.password, saltRounds, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
    }
  }
}
