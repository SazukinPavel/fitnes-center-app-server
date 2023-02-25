import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Client from './client.entity';
import ExerciseInfo from './exercise-info.entity';
import Manager from './manager.entity';

@Entity()
export abstract class Exercise {
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
  exerciseInfo: ExerciseInfo;
}
