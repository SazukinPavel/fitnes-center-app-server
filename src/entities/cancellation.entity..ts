import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Exercise from "./exercise.entity";

@Entity()
export default class Cancellation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reason: string;

  @Column()
  by: string;

  @OneToOne(() => Exercise, (user) => user.cancellation) // specify inverse side as a second parameter
  exercise: Exercise;
}
