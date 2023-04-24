import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export default class ExerciseInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Exercise, (exercise) => exercise.exerciseInfo)
  exercises: Exercise[];
}
