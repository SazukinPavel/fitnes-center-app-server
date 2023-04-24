import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
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

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  createdAt: string;

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
