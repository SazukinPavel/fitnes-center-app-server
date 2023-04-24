import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Exercise, (exercise) => exercise.exerciseInfo)
  exercises: Exercise[];
}
