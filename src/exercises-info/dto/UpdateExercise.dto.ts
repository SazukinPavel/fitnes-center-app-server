import { IsString, IsUUID } from 'class-validator';

export default class UpdateExerciseDto {
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;
}
