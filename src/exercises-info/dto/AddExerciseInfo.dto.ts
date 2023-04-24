import { IsString } from 'class-validator';

export default class AddExerciseInfoDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;
}
