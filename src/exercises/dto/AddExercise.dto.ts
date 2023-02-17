import { IsDate, IsString, IsUUID } from 'class-validator';

export default class AddExerciseDto {
  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsUUID()
  clientId: string;
}
