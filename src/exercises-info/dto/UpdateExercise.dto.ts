import { IsString, IsUUID } from 'class-validator';

export default class UpdateExerciseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
