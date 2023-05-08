import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Auth from './auth.entity';

@Entity()
export default class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ext: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Auth;
}
