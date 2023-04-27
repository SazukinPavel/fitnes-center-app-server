import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Cancellation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @Column()
  by: string;
}
