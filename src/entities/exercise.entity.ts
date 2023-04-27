import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import Client from './client.entity';
import ExerciseInfo from './exercise-info.entity';
import Manager from './manager.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column({ default: false })
  isPayed: boolean;

  @Column({ nullable: true })
  duration: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Client, (client) => client.exercises)
  client: Client;

  @ManyToOne(() => Manager, (manager) => manager.exercises)
  manager: Manager;

  @ManyToOne(() => ExerciseInfo, (exerciseInfo) => exerciseInfo.exercises)
  @JoinColumn()
  exerciseInfo: ExerciseInfo;
}
