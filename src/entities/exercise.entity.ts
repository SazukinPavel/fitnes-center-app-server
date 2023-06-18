import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./client.entity";
import ExerciseInfo from "./exercise-info.entity";
import Manager from "./manager.entity";
import Cancellation from "./cancellation.entity.";

@Entity()
export default class Exercise {
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

  @OneToOne(() => Cancellation, { onDelete: "CASCADE" })
  @JoinColumn()
  cancellation: Cancellation;

  @ManyToOne(() => Client, (client) => client.exercises, { onDelete: "CASCADE" })
  client: Client;

  @ManyToOne(() => Manager, (manager) => manager.exercises, { onDelete: "CASCADE" })
  manager: Manager;

  @ManyToOne(() => ExerciseInfo, (exerciseInfo) => exerciseInfo.exercises)
  @JoinColumn()
  exerciseInfo: ExerciseInfo;
}
