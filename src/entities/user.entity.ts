import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fio: string;

  @Column()
  login: string;

  @Column({ select: false })
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
