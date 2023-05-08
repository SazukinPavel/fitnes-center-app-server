import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from '../types/Role';
import { hash } from 'bcryptjs';
import Avatar from './avatar.entity';

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

  @OneToOne(() => Avatar, (avatar) => avatar.auth)
  avatar: Avatar;

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
