import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ExerciseInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ unique: true })
  name: string;
}
