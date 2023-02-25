import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './client.entity';
import ExerciseInfo from './exercise-info.entity';
import Manager from './manager.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => Client, (client) => client.exercises)
  client: Client;

  @ManyToOne(() => Manager, (manager) => manager.exercises)
  manager: Manager;

  @ManyToOne(() => ExerciseInfo, (exerciseInfo) => exerciseInfo.exercises)
  @JoinColumn()
  exerciseInfo: ExerciseInfo;
}
