import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Manager from "./manager.entity";
import Diet from "./diet.entity";
import Role from "../types/Role";
import Auth from "./auth.entity";
import Exercise from "./exercise.entity";

@Entity()
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  readonly role: Role = 'client';

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  height: number;

  @OneToOne(() => Auth, { cascade: true })
  @JoinColumn()
  auth: Auth;

  @ManyToOne(() => Manager, (Manager) => Manager.clients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  owner: Manager;

  @ManyToOne(() => Diet, (diet) => diet.clients)
  diet: Diet;

  @OneToMany(() => Exercise, (exercise) => exercise.client, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exercises: Exercise[];
}
