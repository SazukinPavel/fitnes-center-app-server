import { IsString } from "class-validator";

export default class AddExerciseDto {
  @IsString()
  description: string;

  date: Date;

  clientId: string;

  exerciseId: string;

  duration: string;
}
